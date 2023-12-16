import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentPayload } from './CommentPayload';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  getAllCommentsForPost(postId: number) : Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>('http://localhost:3500/api/comments/by-post/'+postId)
  }

  postComment(commentPayload : CommentPayload) : Observable<any> {
    return this.httpClient.post<any>('http://localhost:3500/api/comments/',commentPayload)
  }
}
