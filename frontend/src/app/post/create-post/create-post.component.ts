import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { SubredditModel } from "src/app/subreddit/subreddit-response";
import { Router } from "@angular/router";
import { PostService } from "src/app/shared/post.service";
import { SubredditService } from "src/app/subreddit/subreddit.service";
import { CreatePostPayload } from "./create-post.payload";
import { throwError } from "rxjs";
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.css"],
})
export class CreatePostComponent implements OnInit {
  @ViewChild("descriptionTextarea")
  descriptionTextarea!: ElementRef<HTMLTextAreaElement>;
  createPostForm: FormGroup;
  postPayload: CreatePostPayload;
  subreddits: Array<SubredditModel>;
  constructor(
    private router: Router,
    private postService: PostService,
    private subredditService: SubredditService,
    private cdRef: ChangeDetectorRef
  ) {
    this.postPayload = {
      post_name: "",
      url: "",
      description: "",
      subreddit_name: "",
    };
  }

  ngOnInit() {
    this.createPostForm = new FormGroup({
      post_name: new FormControl("", Validators.required),
      subreddit_name: new FormControl("", Validators.required),
      url: new FormControl(""),
      description: new FormControl("", Validators.required),
      customPrompt: new FormControl(""),
    });
    this.subredditService.getAllSubreddits().subscribe(
      (data) => {
        this.subreddits = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }

  createPost() {
    this.postPayload.post_name = this.createPostForm.get("post_name").value;
    this.postPayload.subreddit_name =
      this.createPostForm.get("subreddit_name").value;
    this.postPayload.url = this.createPostForm.get("url").value;
    this.postPayload.description = this.createPostForm.get("description").value;

    this.postService.createPost(this.postPayload).subscribe(
      (data) => {
        this.router.navigateByUrl("/");
      },
      (error) => {
        throwError(error);
      }
    );
  }

  discardPost() {
    this.router.navigateByUrl("/");
  }

  autoResizeTextarea(event: any): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = "auto"; // Reset height
    textarea.style.height = Math.min(textarea.scrollHeight, 300) + "px"; // Cap at 500px
  }

  async applyAi(prompt: string) {
    if (!prompt || !this.createPostForm.get("description").value) {
      return;
    }

    const content = this.createPostForm.get("description").value;

    this.postService.getAIResponse(content, prompt).subscribe(
      (data) => {
        if (data.enhanced) {
          this.createPostForm.patchValue({ description: data.enhanced });
          this.cdRef.detectChanges();

          const textarea = this.descriptionTextarea?.nativeElement;
          if (textarea) {
            textarea.style.height = "auto"; // Reset height
            textarea.style.height = Math.min(textarea.scrollHeight, 300) + "px";
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
