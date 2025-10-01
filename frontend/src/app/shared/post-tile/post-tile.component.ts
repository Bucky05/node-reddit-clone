import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from '../PostModel';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

  @Input() posts: PostModel[];
  faComments = faComments;

  constructor(private postService: PostService , private router : Router) {
   
  }

  ngOnInit(): void {
     console.log(this.posts)
  }

  goToPost(id : string) {
    this.router.navigateByUrl('/view-post/'+id)
  }
}