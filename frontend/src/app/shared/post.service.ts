import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostModel } from './PostModel';
import { Observable } from 'rxjs';
import { CreatePostPayload } from '../post/create-post/create-post.payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http : HttpClient) { }
  baseUrl = "https://node-reddit-clone-b6rc.onrender.com/api"
  getAllPosts() : Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>(`${this.baseUrl}/posts/`)
  }

  createPost(postPayload : CreatePostPayload) : Observable<any> {
    return this.http.post(`${this.baseUrl}/posts`, postPayload)
  }
  getPost(postId : string) : Observable<any> {
    const params = new HttpParams().set('postId', postId);
    return this.http.get<PostModel>(`${this.baseUrl}/posts/` , {params})
  }

  getAllPostsByUser(name : string) : Observable<PostModel[]> {
    return this.http.get<PostModel[]>(`${this.baseUrl}/posts/by-user/`+name)
  }
 
}
