import { Injectable } from '@angular/core';
import { SubredditModel } from './subreddit-response';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  constructor(private http : HttpClient) { }

  getAllSubreddits(): Observable<Array<SubredditModel>> {
    return this.http.get<Array<SubredditModel>>('http://localhost:3500/api/subreddit/')
  }

  createSubreddit(subredditModel: SubredditModel): Observable<SubredditModel> {
    return this.http.post<SubredditModel>('http://localhost:3500/api/subreddit',
      subredditModel);
  }
}
