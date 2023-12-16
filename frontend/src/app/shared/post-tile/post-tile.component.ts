import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from '../PostModel';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

  @Input() data: Array<PostModel>;
  faComments = faComments;
  posts$: Array<PostModel> = [];

  constructor(private postService: PostService) {
    this.postService.getAllPosts().subscribe(post => {
      this.posts$ = post;
    })
  }

  ngOnInit(): void {
  }

}