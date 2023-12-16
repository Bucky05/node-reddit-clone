import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostModel } from './PostModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http : HttpClient) { }

  getAllPosts() : Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>('http://localhost:3500/api/posts/')
  }
}
