import { Injectable } from '@angular/core'
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { AuthService } from './auth/shared/auth.service'
import { BehaviorSubject, Observable } from 'rxjs'
import { LoginResponse } from './auth/login/login-response.payload';
import { switchMap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

//http interceptor sends jwt with every request and uses refresh token when jwt expires

@Injectable({
    providedIn : 'root'
})

export class TokenInterceptor implements HttpInterceptor {

    isTokenRefreshing = false;
    refreshTokenSubject : BehaviorSubject<any> = new BehaviorSubject(null);
    constructor(public authService: AuthService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwtToken = this.authService.getJwtToken();

        if(jwtToken) {
            req = this.addToken(req, jwtToken);
        }
        return next.handle(req).pipe(catchError(error => {
            if(error instanceof HttpErrorResponse && error.status === 403 ) {
                return this.handleAuthErrors(req, next);
            } else {
                return throwError(error)
            }
        }))
    }

    private handleAuthErrors(req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
        if(!this.isTokenRefreshing) {
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null)

            return this.authService.refreshToken().pipe( 
                switchMap((refreshTokenResponse : LoginResponse) => {
                    this.isTokenRefreshing = false
                    this.refreshTokenSubject
                        .next(refreshTokenResponse.authenticationToken)
                    return next.handle(this.addToken(req, 
                            refreshTokenResponse.authenticationToken))
                })
            )
        }
        return this.refreshTokenSubject
    }
    addToken(req : HttpRequest<any>, jwtToken : string) {
        return req.clone({
            headers: req.headers.set('Authorization', 'Bearer '+jwtToken)
        })
    }
}