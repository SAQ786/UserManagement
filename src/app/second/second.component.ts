import { Component, Input, OnInit, Output,TemplateRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ServiceService } from '../service.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { FirstComponent } from '../first/first.component';
import { InputModalityDetector } from '@angular/cdk/a11y';
import { UserServiceService } from '../user-service.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; 
import { NotificationService } from '../notification.service';


@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {
  modalRef: BsModalRef ;  
 l_storage:any;
 userArray:any[] =[];
 
newUserArray:any[]=[];
  id:any;
  userId:any;
  setNewAction:boolean=false;
  data:Array<any>;

  latitude=20.5937;
longitude=78.9629;

 @Output() show= new EventEmitter();
 @Output() actionEvent=new EventEmitter();


@Input() sendAction!:boolean;
 
  constructor(public notify:NotificationService,public router: Router,public authService:AuthService,public route:ActivatedRoute,public _service:ServiceService,public dialog:MatDialog,public userService:UserServiceService,private modalService: BsModalService) {
    this.data = new Array<any>();
    this.modalRef=new BsModalRef();
   // this.modalRef=this.modalService.hide(tem)
}
   
  
  ngOnInit(): void {
    // let localData=localStorage.getItem('user');
    // this.list(localData);
    // console.log(this.newUserArray,"child userarray");
    // this.userArray=this.newUserArray;
    

    //service
   this.userData();
  }
  openModalWithClass(template: TemplateRef<any>) {  
    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: 'gray modal-lg' }) 
  
    );  
  }  
  

  userData(){
    this.userService.getData().subscribe((data)=>{
      this.data=data;
      console.log(data);
          });
          return this.data;
  }
 
  list(localData:any){
    let user_for_list:any={} 
    if(localData){
      user_for_list=JSON.parse(localData);}
      this.newUserArray = user_for_list;
  }
  onClick(){
    this.router.navigate(['registration']);
  }
  onLogin(){
    this.router.navigate(['login']);
  }
  event(event:any){
    console.log("event on map mouse",event)
  }

  delete(id:any){
    
    console.log(id,"id on user");
    // for(let i=0;i<this.userArray.length;i++){
      
    //      if (this.userArray[i].id == id) {
    //     this.userArray.splice(i, 1);
   // }
   // }
    // localStorage.setItem('user',JSON.stringify(this.newUserArray));
    this.modalRef.hide();
    this.userService.deleteUser(id).subscribe(data=>{
    this.ngOnInit();
    });
  }
  edit(id:any){
    console.log(id,"id");
    this.router.navigate(['profile',id]);
  }
  openDialog(template: TemplateRef<any>) {
    
    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: 'gray modal-lg' })  
      
    ); 
  this._service.setAction(true);
  this.setNewAction=true;
   // this.actionEvent.emit(this.newAction);
    //this.dialog.open(FirstComponent,{height:'80%',width:'500%'});
  }

  getAction(event:any){
    console.log(event,"second setaction");
    this.setNewAction=event;
    this.modalRef.hide();
  }

  getEvent(event:any){
    console.log(event,"second event");
  this.userArray.push(event);
  //this.newAction=false;
  this.notify.showSuccess("User is added successfully")
  }
  seeMap(){
 this.router.navigate(['location']);
  }

  
}


// let index=this.userInfo.findIndex(x => x.id==this.id);
//   if(index>-1){
//     this.userInfo[index]=this.user;
//       console.log(this.userInfo,"update user info");
//       localStorage.setItem("user",JSON.stringify(this.userInfo));
//       let name=localStorage.getItem('userinfo');
//       if(this.user.firstName==name){
//       localStorage.setItem('userinfo',this.user.firstName);
//       }
//   }