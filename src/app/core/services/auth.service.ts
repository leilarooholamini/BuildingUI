import { Injectable, Inject } from '@angular/core';

import { BrowserStorageService } from './browser-storage.service';

import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IAppConfig, APP_CONFIG } from './IAppConfig';
 
import { BehaviorSubject, Observable, throwError  } from "rxjs";
import { catchError, map } from "rxjs/operators";


import { Router } from '@angular/router';
import { Credentials } from 'src/app/base-class/dto/Credentials';
import { GridRequest, GridResult } from 'src/app/base-class/grid-classes';
import { UserRoleDto } from 'src/app/base-class/dto/UserRoleDto';







@Injectable({
  providedIn: 'root'
})
export class AuthService {

private authStatusSource=new BehaviorSubject<boolean>(false);
public authStatus$=this.authStatusSource.asObservable();

constructor(  @Inject(APP_CONFIG) private appConfig: IAppConfig,
 private browserStorageService: BrowserStorageService,
 private router:Router,
 private http:HttpClient) {
  this.updateStatusOnPageRefresh();
  }



  private updateStatusOnPageRefresh(): void {

    //this.authStatusSource.next(true);
  this.authStatusSource.next(this.isAuthUserLoggedIn());
  }


  login(credentials: Credentials): Observable<boolean> {

        // const data = 'username=' + credentials.username + '&password=' + credentials.password + "&TypeAuthentication="+credentials.TypeAuthentication+ '&grant_type=password';
        const data ='grant_type=password&username=' + credentials.username + '&password=' + credentials.password + '&TypeAuthentication='+credentials.TypeAuthentication;
      
        // grant_type=password&username=admin&password=123&TypeAuthentication=BD3C1182164F452DBDDE3FC94F0DCF14
         const reqHeader = new HttpHeaders({ "Content-Type": "application/json"  });   
          // const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
       //  return this.http.post(`${this.appConfig.fakeapiEndpoint+this.appConfig.apiSettingsPath}AllServices/Postauth`, {UserName:credentials.username,Password:credentials.password}, { headers: reqHeader })
       return this.http.post(`${this.appConfig.apiEndpoint}/token`, data, { headers: reqHeader })
         .pipe(
           map((response: any) => {
            console.log(response);
          if (!response) {
          
            
               return false;
            }
      

           this.setToken("access_token",response.access_token);
           this.setToken("refresh_token",response.refresh_token);
          
            return true;

         }),
            catchError(this.handleError));
  

  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error("observable error: ", error);
    return throwError(error);
  }

  getRefreshToken(  UserRoleId: string): Observable<boolean> {
    let RefreshToken=this.browserStorageService.getSession("refresh_token");
    const data = 'grant_type=refresh_token&refresh_token=' + RefreshToken + '&Id=' + UserRoleId;
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.post(`${this.appConfig.apiEndpoint}/token`, data, { headers: reqHeader }) .pipe(
   // const reqHeader = new HttpHeaders({ "Content-Type": "application/json"  });   
  //return this.http.post(`${this.appConfig.fakeapiEndpoint+this.appConfig.apiSettingsPath}/AllServices/PostRefresh`, {Refresh_token:RefreshToken,Id:UserRoleId}, { headers: reqHeader }) .pipe(
      map((response: any) => {
     if (!response) {
          this.authStatusSource.next(false);
          return false;
       }
     //  console.log(response);
       this.setToken("IsLog",'True');
       this.setToken("exp",response[".expires"]);
      this.setToken("access_token",response.access_token);
      this.setToken("refresh_token",response.refresh_token);
       this.authStatusSource.next(true);
       return true;

    }),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }


  getUserPermission(url:string):Observable<string[]>{
    const headers = new HttpHeaders({ "Url":url   });
    //return this.http.get<string[]>(`${this.appConfig.fakeapiEndpoint}${this.appConfig.apiSettingsPath+"AllServices/GetData"}`, { headers: headers }
    return this.http.get<string[]>(`${this.appConfig.apiEndpoint}${this.appConfig.apiSettingsPath+url}`, { headers: headers }
    // `${this.appConfig.apiEndpoint}${this.appConfig.apiSettingsPath+url}`
    ).pipe(
      map(result => {
        return  result;
      }));


  }

  getUserRole(url:String , query: GridRequest):Observable<GridResult<UserRoleDto>>{

    let sort='';
    let filter='';
    if(query.Sort.length>0)
     sort= encodeURIComponent (JSON.stringify(query.Sort));

     if(query.Filters!==null)
     filter= encodeURIComponent (JSON.stringify(query.Filters));

    let queryString = 'Page=' + query.Page + '&PageSize=' + query.PageSize
    + '&Filter=' + filter + '&Sort=' + sort;
    const headers = new HttpHeaders({ "Url":url+"?"+queryString   });
      return this.http
        .get<GridResult<UserRoleDto>>(
         `${this.appConfig.apiEndpoint}${this.appConfig.apiSettingsPath+url}?${queryString}`, { headers: headers }
      //  `${this.appConfig.fakeapiEndpoint}${this.appConfig.apiSettingsPath+"AllServices/GetData"}`, { headers: headers }
        ).pipe(
          map(result => {
            return <GridResult<UserRoleDto>>{
              Total: result.Total,
              Data: result.Data
            };
          }));

  }

onRemoveToken(){
  this.browserStorageService.removeAllLocals();
  this.browserStorageService.removeAllSessions();
}
  logout(navigateToHome: boolean): Observable<boolean> {
    const headers = new HttpHeaders({ "Url":"SignOutPanel"   });
  return  this.http
      .post(
     //   `${this.appConfig.fakeapiEndpoint}${this.appConfig.apiSettingsPath+"AllServices/PostData"}`, null,{ headers: headers }).pipe( map((response: any) => {
   `${this.appConfig.apiEndpoint+this.appConfig.apiSettingsPath}SignOutPanel`,null).pipe( map((response: any) => {
 
        if (!response) {
             this.authStatusSource.next(false);
             return false;
          }
          this.onRemoveToken();
          this.authStatusSource.next(false);
          return true;

       }),
         catchError((error: HttpErrorResponse) => throwError(error))
       );
  }

  isAuthUserLoggedIn(){

   return !this.isEmptyString(this.getRawAuthToken("access_token"));

  }


  isEmptyString(value: string): boolean {
    return !value || 0 === value.length;
  }

  getRawAuthToken(tokenType: string): string {
      return this.browserStorageService.getLocal(tokenType);
   }

   private setToken(tokenType: string, tokenValue: string): void {
      this.browserStorageService.setSession(tokenType , tokenValue);
    }

 OnRedirectToLogin()
 {
  this.router.navigate(["login"]);}
}
