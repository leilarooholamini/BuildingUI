import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable()
  export class PermissionService {

constructor(private http:HttpClient) {
    
}
getUserPermissionPromiss(url:string):Promise<any>{
    if( sessionStorage.getItem("IsLog")!=null){
      const headers = new HttpHeaders({ "Url":url   });
 return this.http.get<string[]>("http://178.22.123.214/service/api/"+url).toPromise().catch((res)=>{ 
 //   return this.http.get<string[]>("http://localhost:2517/api/"+url).toPromise().catch((res)=>{ 
   // return this.http.get<string[]>("http://asir2019.ddns.net/servicefake/api/AllServices/GetData", { headers: headers }).toPromise().catch((res)=>{ 
     
     })}
  else
     return new Promise<void>(resolve => resolve());
  }
}
