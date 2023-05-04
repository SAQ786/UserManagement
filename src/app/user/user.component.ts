import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormControl, FormGroup, NgForm,Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserServiceService } from '../user-service.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  modalRef: BsModalRef ;  
  //center: google.maps.LatLngLiteral

  user: {
    id:number,
    name: string,
    username: string,
    email: string,
    phone: string
    address: string,
    password:string,
    company:string,
    website:string,
    location:{latitude:string,longitude:string}
  } = { id:0 ,name: '', username: '', email: '', phone: '', address: '', password:'', company:'',website:'',location:{latitude:'',longitude:''}}
 id:any;
l_storage:any;
userInfo:any[]=[]
apidata:Array<any>;
latitude=20.5937;
longitude=78.9629;

onLoc=false;




  constructor(public route: ActivatedRoute,public userService:UserServiceService,public router: Router,private modalService: BsModalService,public maps:GoogleMapsModule,public notify:NotificationService) { 
    this.apidata=new Array<any>();
    this.modalRef=new BsModalRef();
    
  }

  ngOnInit(): void {
    
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id,"id on user");
    if(this.id){
      this.userData();
    }

    // this.l_storage=localStorage.getItem('user');
    // if(this.l_storage)
    // {
    //   this.userInfo=JSON.parse(this.l_storage);
    // }
    //this.fetchData();
    // navigator.geolocation.getCurrentPosition((position) => {
    //   this.center = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude,
    //   }
    // })

  }


  // fetchData(){
  //  
    
  //   console.log("user",this.user);
  // }

userData(){
  
this.userService.getSpecificUser(this.id).subscribe(data=>{
      this.apidata=data;
      console.log(data,"user data by id");
      console.log(this.apidata,"api data");
      this.user.id=data.id;
      this.user.name=data.name;
      this.user.username=data.username;
      this.user.email=data.email;
      this.user.phone=data.phone;
      this.user.address=data.address;
      this.user.company=data.company;
      this.user.password=data.password;
      this.user.website=data.website;
          });
        
}
updateInfo(userForm?: NgForm){
  
  // let index=this.apidata.findIndex(x => x.id==this.id);
  // if(index>-1){
  //   this.apidata[index]=this.user;
  //     console.log(this.apidata,"update user info");
  //     localStorage.setItem("user",JSON.stringify(this.apidata));
  //     let name=localStorage.getItem('userinfo');
  //     if(this.user.name==name){
  //     localStorage.setItem('userinfo',this.user.name);
  //     }
  // }
  console.log(this.user,"on update");

  this.userService.updateUser(this.id,this.user).subscribe(data=>{
    console.log('Post updated successfully!',data);
    this.notify.showSuccess("Location is updated successfully")
    if(userForm){
      this.router.navigate(['detail']);
      this.notify.showSuccess("user info is updated successfully")

    }
    
  })
  
}
onClick(){
  this.router.navigate(['detail']);
}

openDialog(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(  
    template,  
    Object.assign({}, { class: 'gray modal-lg' })  
  ); 

}
selectLocation(event: any){
  console.log(event,"event on map");
  this.latitude=event.coords.lat;
  this.longitude=event.coords.lng;
  this.user.location.latitude=event.coords.lat;
  this.user.location.longitude=event.coords.lng;

 this.onLoc=true;
  this.updateInfo();


}
// UpdateLocation(){
//   
// this.userService.updateUser(this.id,this.user).subscribe(res=>{
//   console.log(res);
  
// })

}