import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentPayload } from './CommentPayload';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseUrl = "https://reddit.anirudhrathore.com/api"
  constructor(private httpClient: HttpClient) { }

  getAllCommentsForPost(postId: string) : Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(`${this.baseUrl}/comments/`,{ params : {postId : postId}})
  }

  postComment(commentPayload : CommentPayload) : Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/comments/`,commentPayload)
  }
  getAllCommentsByUser(id : string) : Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(`${this.baseUrl}/comments/by-user/`,{params: {username :id}})
  }
}
