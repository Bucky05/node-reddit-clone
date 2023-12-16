import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostModel } from './PostModel';
import { Observable } from 'rxjs';
import { CreatePostPayload } from '../post/create-post/create-post.payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http : HttpClient) { }

  getAllPosts() : Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>('http://localhost:3500/api/posts/')
  }

  createPost(postPayload : CreatePostPayload) : Observable<any> {
    return this.http.post('http://localhost:3500/api/posts', postPayload)
  }
  getPost(postId : number) : Observable<any> {
    return this.http.get('http:/localhost:3500/api/posts/' + postId)
  }
}
