import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';
import { PostService } from '../shared/post.service';
import { PostModel } from '../shared/PostModel';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  faUser = faUser
  isLoggedIn : boolean 
  username : string

  posts: Array<PostModel> = [];

  constructor(private postService: PostService,private authService  : AuthService, private router : Router, private httpClient : HttpClient) {
    this.postService.getAllPosts().subscribe(post => {
      this.posts = post;
    });
  }


  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn()
    this.authService.username.subscribe((data:string) => this.username = data)
  }

  goToUserProfile() {
    this.router.navigateByUrl('/user-profile/'+ this.username)
  }
  logout() {
   this.authService.logout()
   this.isLoggedIn = false
   this.router.navigateByUrl('')

    
  }
  getSignUp() {
    this.router.navigateByUrl('/sign-up')
  }
}
