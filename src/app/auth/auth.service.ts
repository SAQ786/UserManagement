import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
 userName:any="";
 message:string="";
  // store the URL so we can redirect after logging in
  redirectUrl: string | null = "/detail";
  
  constructor(public router:Router) { }
  
  logout() {
    localStorage.setItem("userinfo","");
    return this.isLoggedIn = false;
  }
  checklogin(){
    let l_storage=localStorage.getItem("userinfo");
    this.userName=l_storage;
    console.log(l_storage,"l storage");
    if(l_storage){
     this.isLoggedIn=true;
    return this.isLoggedIn;
    }else{
      this.message="You don't have a permission to view this page";
      return this.isLoggedIn=false;
    }
  }


}

