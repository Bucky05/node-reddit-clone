import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PostModel } from '../PostModel';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { VoteService } from '../vote.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { PostService } from '../post.service';
import { VotePayload } from './vote-payload';
import { VoteType } from './vote-type';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post: PostModel;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  votePayload : VotePayload
  upvoteColor : string;
  downvoteColor : string

  constructor(private voteService : VoteService,
    private authService : AuthService,
    private postService: PostService, 
    private toastr: ToastrService) {

      this.votePayload = {
        voteType : undefined,
        entryId : undefined
      }
  }

  ngOnInit() {
   this.updateVoteDetails()
  }

  

  upvotePost () {
    this.votePayload.voteType = VoteType.UPVOTE
    this.vote()
  }
  downvotePost() {
     this.votePayload.voteType = VoteType.DOWNVOTE
     this.vote()
  }

  private vote() {
    this.votePayload.entryId = this.post.post_id;
    this.voteService.vote(this.votePayload).subscribe(() => {
      this.updateVoteDetails()
    },
    error => {
      this.toastr.error(error.error.text)
      throw (error)
    })
  }

  private updateVoteDetails() {
    try {
    this.postService.getPost(this.post.post_id).subscribe(post => {
      this.post.vote_count = post.vote_count
    })
  }
  catch(err) {
    console.log(err)
  }
  }

}