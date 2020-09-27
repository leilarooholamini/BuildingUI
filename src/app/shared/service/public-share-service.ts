 




import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
 
 
import {catchError, map } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { IAppConfig, APP_CONFIG } from 'src/app/core/services/IAppConfig';
import { GridRequest, GridResult } from 'src/app/base-class/grid-classes';
 
  

@Injectable()
export class PublicShareService { 
  urlImagePath:string;
  constructor( @Inject(APP_CONFIG) private appConfig: IAppConfig,  private _http:HttpClient) { 
    this.urlImagePath=appConfig.imageSrc
  }


getbyId(url:string,id:string):Observable<any>{

  return this._http.get<any>(`${this.appConfig.apiEndpoint}${this.appConfig.apiSettingsPath+url}/${id}`).pipe(
    map((result:any) => {return result}),
    catchError(this.handleError));
}

getAll(url:string):Observable<any>{

    return this._http.get<any>(`${this.appConfig.apiEndpoint}${this.appConfig.apiSettingsPath+url}`).pipe(
      map((result:any) => {return result}),
      catchError(this.handleError));
  }

  getXML(url:string):Observable<any>{
    const headers = new HttpHeaders({ "Accept": "application/xml" });
    return this._http.get<any>(`${this.appConfig.apiEndpoint}${this.appConfig.apiSettingsPath+url}`, { headers: headers }).pipe(
      map((result:any) => {return result}),
      catchError(this.handleError));
  }


getGridPage(url : string , query: GridRequest,parameterQs:string):Observable<GridResult<any>>{

  let sort='';
  let filter='';
  if(query.Sort.length>0)
   sort= encodeURIComponent (JSON.stringify(query.Sort));

   if(query.Filters!==null)
   filter= encodeURIComponent (JSON.stringify(query.Filters));


  let queryString = 'Page=' + query.Page + '&PageSize=' + query.PageSize
  + '&Filter=' + filter + '&Sort=' + sort;
  if(parameterQs)
  queryString+="&"+parameterQs;

    return this._http
      .get<GridResult<any>>(
        `${this.appConfig.apiEndpoint}${this.appConfig.apiSettingsPath+url}?${queryString}`
      ).pipe(
        map(result => {
          return <GridResult<any>>{
            Total: result.Total,
            Data: result.Data
          };
        }), catchError(this.handleError));
 
}

private handleError(error: HttpErrorResponse): Observable<any> {
  console.error("observable error: ", error);
  return observableThrowError(error);
}

Save(url:string, entity: any ,editmode:boolean): Observable<any> {
   const headers = new HttpHeaders({ "Content-Type": "application/json" });
  if(!editmode)
  return this._http
    .post(`${this.appConfig.apiEndpoint}${this.appConfig.apiSettingsPath+url}`, entity, { headers: headers })
    .pipe(
      map(response => response || {}),
      catchError(this.handleError));
  else
      return this._http
      .put(`${this.appConfig.apiEndpoint}${this.appConfig.apiSettingsPath+url}`, entity, { headers: headers })
      .pipe(
        map(response => response || {}),
        catchError(this.handleError));
}

onDelete(url:string, id: String): Observable<any> {
  const headers = new HttpHeaders({ "Content-Type": "application/json" });
  return this._http
    .delete(`${this.appConfig.apiEndpoint}${this.appConfig.apiSettingsPath+url}/${id}`, { headers: headers })
    .pipe(
      map(response => response || {}),
      catchError(this.handleError));
}


onDeleteByQueryString(url:string,qs:string): Observable<any> {
  const headers = new HttpHeaders({ "Content-Type": "application/json" });
  return this._http
    .delete(`${this.appConfig.apiEndpoint}${this.appConfig.apiSettingsPath+url+qs}`, { headers: headers })
    .pipe(
      map(response => response || {}),
      catchError(this.handleError));
}

uploadFile(url:string, file: any ): Observable<any>{
  return this._http
    .post(`${this.appConfig.apiEndpoint}${this.appConfig.apiSettingsPath+url}`, file,{reportProgress: true, observe: 'events'} )
    .pipe(
      map(response => response || {}),
      catchError(this.handleError));
}


getUserPermissionPromiss(url:string):Promise<any>{

  if( sessionStorage.getItem("IsLog")!=null &&  Date.parse(sessionStorage.getItem("exp") ) >Date.now() )
     return this._http.get<string[]>(`${this.appConfig.apiEndpoint}${this.appConfig.apiSettingsPath+url}`).toPromise()
else 
   return new Promise<void>(resolve => resolve());
}

}
