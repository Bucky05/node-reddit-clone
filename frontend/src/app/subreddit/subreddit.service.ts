import { Injectable } from '@angular/core';
import { SubredditModel } from './subreddit-response';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  constructor(private http : HttpClient) { }
  baseUrl = "https://reddit.anirudhrathore.com/api"
  getAllSubreddits(): Observable<Array<SubredditModel>> {
    return this.http.get<Array<SubredditModel>>(`${this.baseUrl}/subreddit/`)
  }

  createSubreddit(subredditModel: SubredditModel): Observable<SubredditModel> {
    return this.http.post<SubredditModel>(`${this.baseUrl}/subreddit`,
      subredditModel);
  }
}
