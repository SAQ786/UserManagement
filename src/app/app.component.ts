import { Component, AfterContentChecked, AfterContentInit, DoCheck, OnChanges, OnInit, SimpleChanges, ViewChild, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator, Form, NgForm } from '@angular/forms';
import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CanActivate } from "@angular/router";
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { NgModule } from '@angular/core';
import { FirstComponent } from './first/first.component';
import { EventEmitter } from '@angular/core';
import { ServiceService } from './service.service';
import { HttpsInterceptor } from './https.interceptor';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],



})
export class AppComponent implements OnInit {
  [x: string]: any;

  message: string = "appcomponent";
  @ViewChild(FirstComponent) first!: string;


  title: any = 'newApp';
  user: {
    firstName: string,
    lastName: string,
    email: string,
    phone: string
    check: string
  } = { firstName: 'Absar', lastName: 'Qureshi', email: 'ab@gmail.com', phone: '1111111', check: 'true' };

  newUser: {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    check: string
  } = { firstName: '', lastName: '', email: '', phone: '', check: '' };

  href: any;

  switchValue = 2;

  constructor(private route: ActivatedRoute, public authService: AuthService, public router: Router, private _service: ServiceService, public interceptor: HttpsInterceptor) {
    console.log("constructor is called")
  }
  ngOnInit() {
    this.href = this.router.url;
    console.log(this.router.url, "url");

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, "on changes is called");

  }


  people: any[] = [
    {
      "name": "Douglas  Pace",
      "country": 'UK'
    },
    {
      "name": "Mcleod  Mueller",
      "country": 'USA'
    },
    {
      "name": "Day  Meyers",
      "country": 'HK'
    },
    {
      "name": "Aguirre  Ellis",
      "country": 'UK'
    },
    {
      "name": "Cook  Tyson",
      "country": 'USA'
    }
  ];

  getColor(country: any) {
    switch (country) {
      case 'UK':
        return 'green';
      case 'USA':
        return 'blue';
      case 'HK':
        return 'red';
      default:
        return 'orange';
    }
  }


  userArray: any[] = [];
  messageForFirstName: string = "";
  messageForLastName: string = "";
  messageForEmail: string = "";
  messageForPhone: string = "";
  value: string = "";
  save: boolean = false;

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
      } else { this.messageForFirstName = "Enter only letters" }
      event.target.value = this.value;


      return false;
    }
  }


  keyPressAlpha(event: any) {

    // console.log(event.target.value)
    let letters = /^[A-Za-z]+$/;
    if (this.user.lastName.match(letters)) {
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
    console.log(userForm);

    let user_for_list: any = {}
    this.newUser.firstName = this.user.firstName;
    this.newUser.lastName = this.user.lastName;
    this.newUser.email = this.user.email;
    this.newUser.phone = this.user.phone;

    console.log(this.user, "user")
    if (this.user.check == null) {
      this.user.check = 'false';
    }
    this.newUser.check = this.user.check;
    console.log(this.user, "user")
    console.log(this.newUser, "newUser");
    this.showList();
    this.formReset(userForm);
  }

  showList() {

    let user_for_list: any = {}
    user_for_list.firstName = this.user.firstName;
    user_for_list.lastName = this.user.lastName;
    user_for_list.email = this.user.email;
    user_for_list.phone = this.user.phone;
    user_for_list.check = this.user.check;
    console.log(this.newUser, "newUser");
    this.userArray.push(user_for_list);

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
  //   ngOnInit(): void {
  // //       console.log("ngOnInit is called");
  // }
  ngAfterViewInit() {
    this.message = this.first;
    console.log("view init");
  }

  //  ngDoCheck(){
  //  console.log("ngDoCheck is called");
  //  }
  //  ngAfterContentInit(){
  //    console.log("ngAfter Content init checked is called");
  //  }
  //  ngAfterContentChecked(){
  //    console.log("ng after content checked")
  //  }
  //  ngAfterViewChecked(){
  //    console.log("after view Checked")
  //  }
  //  ngOnDistroy(){
  //    console.log("Distroy");
  //  }


  logout() {
    this.authService.logout();
    this.router.navigate(['login']);

  }
  greet(name: string) {
    alert("hello" + name);
  }

  greetStudents() {
    this._service.sendMessage("Good Morning");
  }
  appreciateStu() {
    this._service.sendMessage("Well Done");
  }


}

