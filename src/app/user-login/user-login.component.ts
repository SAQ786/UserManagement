import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Form } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styles: ['']
})
export class UserLoginComponent implements OnInit {
   userInfo=[{firstName:'',lastName:'', email:'',phone:'',password:''}];
   userName:string='';

   user:{
  email:string,
  password:string;
}={email:'',password:''}
message:string='';
message_for_email:string='';
message_for_password:string='';
email_error=false;
password_error=false;
epError=false;
// message_for_log :string;
move=false;
data:Array<any>;

constructor(public router:Router,public authService: AuthService,public userService:UserServiceService) { 
    // this.message_for_log = this.getMessage();
    this.data=new Array<any>();
    this.getData();

  }

  ngOnInit(): void {
   
  }

  // getMessage() {
  //   return 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  // }
  getData(){
    
    this.userService.getData().subscribe((data)=>{
      this.data=data;
      console.log(data);
          });
          return this.data;
  }

  onClick(event:any){
   
  //this.message_for_log = 'Trying to log in ...';
  //let local_data = localStorage.getItem("user")
    // if (local_data) {
    //    this.userInfo = JSON.parse(local_data);
    //    console.log(this.userInfo,"user Info");
    //   }
      
           
        for(let i=0; i<this.data.length; i++){
          console.log(this.data[i],"user info [i]");
          if((this.data[i].email==this.user.email) ){
            this.move=true;
            this.userName=this.data[i].name;
            break;
          }
        }

    // for(let i=0; i<this.userInfo.length; i++){
    //   console.log(this.userInfo[i],"user info [i]");
    //   if((this.userInfo[i].email==this.user.email) && (this.userInfo[i].password==this.user.password)){
    //     this.move=true;
    //     this.userName=this.userInfo[i].firstName;
    //     break;
    //   }
    // }
    // this.userInfo.forEach((value:any,key) => {
    //   
    //   if((value.email==this.user.email && value.password==this.user.password) && !this.move){
    //     this.move=true;    
    //   }else if((value.email !=this.user.email) && !this.email_error){
    //     this.email_error=true;
    //   }else if((value.password !=this.user.password) && !this.password_error){
    //    this.password_error=true;
    //   }else{
    //     console.log(value);
    //   }
      
    // } )
    if(!this.move){
      this.message="please enter correct email & password";
   }
  //  if(this.email_error){
  //    this.message_for_email="Please enter correct email";
  //  }
  //  if(this.password_error){
  //    this.message_for_password="Please enter correct password";
  //  }
  
    
    if(this.move==true){
      let data=localStorage.getItem("userInfo");
console.log(data,"data");
localStorage.setItem("userinfo",JSON.stringify(this.userName));
      this.router.navigate(['detail']);
       }

}

    // this.authService.login().subscribe(() => {
    //  this.message = this.getMessage();
    //   if (this.authService.isLoggedIn) {
    //     // Usually you would use the redirect URL from the auth service.
    //     // However to keep the example simple, we will always redirect to `/admin`.
    //     const redirectUrl = '/admin';

    //     // Redirect the user
    //     if(this.move==true){
    //     this.router.navigate(['/detail']);}
    //   }
    // });

signUp(){
  this.router.navigate(['registration']);
}

}

