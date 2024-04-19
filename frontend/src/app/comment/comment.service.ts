import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentPayload } from './CommentPayload';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  getAllCommentsForPost(postId: string) : Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>('http://localhost:3500/api/comments/',{ params : {postId : postId}})
  }

  postComment(commentPayload : CommentPayload) : Observable<any> {
    return this.httpClient.post<any>('http://localhost:3500/api/comments/',commentPayload)
  }
  getAllCommentsByUser(id : string) : Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>('http://localhost:3500/api/comments/by-user/',{params: {username :id}})
  }
}
