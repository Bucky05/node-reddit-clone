import { EventEmitter, Injectable, Output } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { SignupRequestPayloadComponent } from '../signup/singup-request-payload';
import {Observable, throwError} from 'rxjs'
import { LoginRequestPayload } from '../login/login-request-payload';
import { LoginResponse } from '../login/login-response.payload';
import { catchError, map , tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  @Output() loggedIn : EventEmitter<boolean> = new EventEmitter()
  @Output() username : EventEmitter<string> = new EventEmitter()


  refreshTokenPayload = {
    refreshToken : this.getRefreshToken(),
    username : this.getUserName()
  }
  constructor(private httpClient : HttpClient) { }

  signup(signupRequestPayload : SignupRequestPayloadComponent) : Observable<any> {
    return this.httpClient.post('http://localhost:3500/api/auth/signup',signupRequestPayload , { responseType: 'text'})
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean | string> {
    return this.httpClient.post<LoginResponse>('http://localhost:3500/api/auth/login', loginRequestPayload)
      .pipe(map(data => {
        window.localStorage.setItem('authenticationToken', data.authenticationToken);
        window.localStorage.setItem('username', data.username);
        window.localStorage.setItem('refreshToken', data.refreshToken);
        window.localStorage.setItem('expiresAt', ""+data.expiresAt);

        this.loggedIn.emit(true)
        this.username.emit(data.username)
        return true;
      }),
      catchError((error : HttpErrorResponse)  => {
        console.log('Unable to login ',error)
        throw(error.error)
      }))
    }
  
  

  getJwtToken() {
    return window.localStorage.getItem('authenticationToken')
  }
  refreshToken() {
    const refreshTokenPayload = {
      refreshToken : this.getRefreshToken(),
      username : this.getUserName()
    }

    return this.httpClient.post<LoginResponse>('http://localhost:3500/api/auth/refresh/token',
    refreshTokenPayload)
      .pipe(tap(response => {
        window.localStorage.setItem('authenticationToken',response.authenticationToken)
        window.localStorage.setItem('expiresAt', ""+response.expiresAt)
      }))
  }

  getRefreshToken() {
    return window.localStorage.getItem('refreshToken');
  }

  getUserName() {
    return window.localStorage.getItem('username');
  }

  getExpirationTime() {
    return window.localStorage.getItem('expiresAt');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null
  }
logout () {
  this.httpClient.post('http://localhost:3500/api/auth/logout',this.refreshTokenPayload,
  {responseType : 'text'}).subscribe(data => {
    console.log(data)
  }, error => {
    throwError(error)
  
  })

  window.localStorage.clear()

}
}
