import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { SignupRequestPayloadComponent } from '../signup/singup-request-payload';
import {Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient : HttpClient) { }

  signup(signupRequestPayload : SignupRequestPayloadComponent) : Observable<any> {
    return this.httpClient.post('http://localhost:3500/api/auth/signup',signupRequestPayload , { responseType: 'text'})
  }
}
