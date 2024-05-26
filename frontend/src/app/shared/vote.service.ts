import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VotePayload } from './vote-button/vote-payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http : HttpClient) { }
  baseUrl = "https://node-reddit-clone-b6rc.onrender.com/api"
  
  vote(votePayload : VotePayload) : Observable<any> {
    return this.http.post(`${this.baseUrl}/vote/`,JSON.parse(JSON.stringify(votePayload)))
    
  }
}
