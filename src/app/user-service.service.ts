import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  baseUrl='';
  constructor(private httpClient: HttpClient) { 
    this.baseUrl=environment.baseUrl;  
  }


  getData():Observable<any>{
    const url=this.baseUrl+'users';
    return this.httpClient.get<any>(url);
  }

  getSpecificUser(id:number):Observable<any>{
    
    const url=this.baseUrl+'users/'+id;
    return this.httpClient.get<any>(url);
  }

  updateUser(id:number,user:object):Observable<any>{
    
    return this.httpClient.put<any>(this.baseUrl+'users/'+id,user);
    
  
  }
  deleteUser(id:number){
    return this.httpClient.delete(this.baseUrl+'users/'+id);

  }
 
  addUser(data:any){
    return this.httpClient.post(this.baseUrl+'users/',data);
  }
  updateLocation(id:number,location:any){
 return this.httpClient.post(this.baseUrl+'users/'+id, location);
  }

}
