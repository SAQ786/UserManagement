import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {
  //@Input() message!: string;
  //@Input() message!: string;
  //@Input() message!: string;
  //@Input() message!: string;
  @Input()
  item!: boolean;

 //message="hello absar";
   user: {
    id:number,
    name: string,
    username: string,
    email: string,
    phone: string
    address: string,
    password:string,
    company:string,
    website:string
  } = { id:0 ,name: '', username: '', email: '', phone: '', address: '', password:'', company:'',website:''};

  newUser: {
    name: string,
    username: string,
    email: string,
    phone: string,
    address: string,
    password:string,
    company:string,
    website:string
  } = { name: '', username: '', email: '', phone: '', address: '' ,password:'',company:'',website:'' };
  
  messageForFirstName: string = "";
  messageForLastName: string = "";
  messageForEmail: string = "";
  messageForPhone: string = "";
  value: string = "";
  save: boolean = false;
  form: any;
 data:Array<any>;
 @ViewChild('userRef') userNameRef!:ElementRef;


 name:string="absar;"

 @Input('newAction') newAction:boolean=false;

// @Output() greetEvent= new EventEmitter();
@Output('addUser') addUser:EventEmitter<any>=new EventEmitter();
 
@Output('setAc') setAc : EventEmitter<any>=new EventEmitter(); 

  constructor(public router: Router,public _service:ServiceService,public userService:UserServiceService) {
    console.log(this.newAction,"newAction value");
    this.data = new Array<any>();

    this.userService.getData().subscribe((data: any)=>{
console.log(data);
    });

   }
  ngAfterViewInit(){
   // this.userNameRef.nativeElement.focus();
  }

  ngOnInit(): void {
    this._service.teacherMsg$
    .subscribe( message  =>{
      if(message  == "Good Morning"){
        alert("Good Morning Teacher");
      }else if(message=="Well Done"){
        alert("thank you teacher");
        
      }
    }
      );

  }
  // callGreet(){
  //   this.greetEvent.emit(this.name);
  // }

action(action:any){
  console.log(action,"action");
  this.newAction=action.value;
  
}
getAction(){
  this.newAction=true;
}

closeDilog(){
  this._service.setAction(false);

}

newEvent(event:any){
  this.newAction=event.value;

}

  keyPressNumbers(event: any) {

    let charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    let number = /^[0-9]+$/;
    //console.log(this.user.phone)
    if (this.user.phone.match(number)) {

      this.messageForPhone = "";
      return true;
    } else {
      event.preventDefault();
      this.messageForPhone = "Enter only Numbers";
      return false;
    }
  }


  keyPressAlphabet(event: any) {

    // console.log(event.target.value)

    let letters = /^[A-Za-z]+$/;
    if (event.target.value.match(letters)) {
      this.messageForFirstName = "";
      this.value = event.target.value;
      return true;
    } else {
      if (event.target.value == 0) {
        this.value = "";
      } else {
         this.messageForFirstName = "Enter only letters";
         }
      event.target.value = this.value;
      return false;
    }
  }


  keyPressAlpha(event: any) {

    // console.log(event.target.value)
    let letters = /^[A-Za-z]+$/;
    if (this.user.username.match(letters)) {
      this.value = event.target.value;
      this.messageForLastName = "";
      return true;
    } else {
      if (event.target.value == 0) {
        this.value = "";
      } else {
        this.messageForLastName = "Enter only letters"
      }
      event.target.value = this.value;

      return false;
    }
  }


  emailCheck(event: any) {

    //console.log(this.user.email)
    console.log(event.target.value, "target")
    let emailId = /^[a-z0-9+_.-]+@[a-z.-]+$/;
    if (this.user.email.match(emailId)) {
      this.messageForEmail = "";
      return true;
    } else {
      this.messageForEmail = "Enter email in proper case for Ex: test123@gmail.com"
      return false;
    }

  }





  onSubmit(userForm: NgForm) {
    

    this.save = true;
    console.log(userForm,"user form");
 this.userService.addUser(this.user).subscribe(data=>{
    console.log(data,"user is registerd");
    this.ngOnInit();
 });
    
    // this.newUser.firstName=this.user.firstName;
    // this.newUser.lastName=this.user.lastName;
    // this.newUser.email=this.user.email;
    // this.newUser.phone=this.user.phone;

    // console.log(this.user, "user")
    // if (this.user.check == null) {
    //   this.user.check = 'false';
    // }
    //this.router.navigate(['login']);
    // console.log(this.user, "user");
  this.showList();
 this._service.setAction(false);
 this.newAction=false;
 
 
    this.formReset(userForm);
    

  }

  showList() {
    
    this.user.id=this.user.id+1;
    let user_for_list: any = {}
    user_for_list.firstName = this.user.name;
    user_for_list.lastName = this.user.username;
    user_for_list.email = this.user.email;
    user_for_list.phone = this.user.phone;
    user_for_list.address = this.user.address;
    user_for_list.password = this.user.password;
    user_for_list.id=this.user.id;
    console.log(this.newUser, "newUser");
    // this.userArray.push(user_for_list);
    // console.log(this.userArray,"userArray")
    let store=[];
    this.setAc.emit(false);

    let local_data = localStorage.getItem("user");
    if (local_data) {
       store = JSON.parse(local_data);
       let id=store.length+1;
       user_for_list.id=id;
      console.log(store, "values stored in ls");
     
      store.push(user_for_list);
      
    }else{
      store.push(user_for_list);

    }
    localStorage.setItem("user", JSON.stringify(store));
    this.addUser.emit(user_for_list);
    if(!this.newAction){
      this.router.navigate(['login']);
    }
    
    // else{
    // //   this.router.navigate(['/login'])
    // }
    

  }

  formReset(userForm: NgForm) {
    // if(true){
    //   this.user.firstName="";
    //   this.user.lastName="";
    //   this.user.email="";
    //   this.user.phone="";

    //   userForm.form.controls['firstName'].setErrors(null);
    //   userForm.form.controls['lastName'].setErrors(null);
    //   userForm.form.controls['email'].setErrors(null);
    //   userForm.form.controls['cell'].setErrors(null);

    // }

    userForm.resetForm('');

    for (let i in userForm.controls) {

      userForm.controls[i].setErrors(null);
    }
  }


}
