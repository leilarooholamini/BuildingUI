import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { AuthService } from '../services/auth.service';
import { BrowserStorageService } from '../services/browser-storage.service';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AuhInterceptor implements HttpInterceptor {
    constructor(private browserStorageService:BrowserStorageService){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available

        const token = this.browserStorageService.getSession("access_token");

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization:"bearer "+token
                }
            });
        }
        return next.handle(request);
    }
}


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private browserStorageService:BrowserStorageService,private authService: AuthService,
        private router:Router) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401 ||err.status === 406) {
                this.browserStorageService.removeAllLocals();
               this.authService.OnRedirectToLogin();
          // this.router.navigate(["oauth/login"]);
          // alert('خطا Error Interceptor ');
              return;
            }
            let errorLogin=false;
            if(err.status === 400)
            {
                Object.keys(err.error).forEach(key => {

                    if (key === "error_description") {
                        errorLogin=true;
                    }
                });

                if(errorLogin){
                    let  errorObj={error: err.error.error_description ,statusText:err.statusText ,statusCode:err.status}
                    return throwError(errorObj);
                 }

               let  errorObj={error: err.error ,statusText:err.statusText ,statusCode:err.status}
              return throwError(errorObj);
            }

            if(err.status === 409)
              {
                  //err.error.message
                  let error ={error: err.error.Message || err.statusText , statusText:err.statusText ,statusCode:err.status} ;
            return throwError(error);
              }
              return throwError(err);
        }));
    }

}
@Injectable()
export class SpinnerLoadingInterceptor implements HttpInterceptor {

     constructor(private spinnerService: NgxSpinnerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.spinnerService.show();

        return next
            .handle(req)
            .pipe(
                tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        this.spinnerService.hide();
                    }
                }, (error) => {
                    this.spinnerService.hide();
                })
            );
    }
}
