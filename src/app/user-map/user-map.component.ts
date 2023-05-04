import { MapsAPILoader } from '@agm/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Input, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-user-map',
  templateUrl: './user-map.component.html',
  styleUrls: ['./user-map.component.css']
})

export class UserMapComponent implements OnInit {
data:Array<any>;
latitude=32.0985077;
longitude=99.5603479;

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



icon = {
  url: './assets/img/user.jpg',
  scaledSize: {height: 40, width: 40}
}
// bounds={
// latlng:
// }

@Input('markerDraggable') draggable = false;

check:boolean=false;
  constructor(public userService:UserServiceService,public notification:NotificationService) { 
    this.data = new Array<any>();
    const geocoder = new google.maps.Geocoder();

  }

  ngOnInit(): void {
    this.userService.getData().subscribe(res=>{
      this.data=res;
    })
  }
  checkbox(event:any){
 console.log(event.target.value,"on map check")
  }
  change(event:any){
   // console.log(event.target.checked,"check box function")
    this.check=event.target.checked;
    this.draggable=event.target.checked;
  }
  changeLocation(event:any,id:number){
    console.log("map",event.coords.lat,id);

  for(let i=0; i<this.data.length;i++){
    if(id==this.data[i].id){
     this.user=this.data[i];
    this.user.location.latitude=event.coords.lat;
    this.user.location.longitude=event.coords.lng;
   
     break;
  }
}
    this.userService.updateUser(id,this.user).subscribe(data=>{
      console.log('Post updated successfully!',data);
      this.showMessage();
    
   })
  }
  showMessage(){
    this.notification.showSuccess("Location updated sucessfully");
    
  }
 
    markerIconUrl(event:any) {
      console.log("marker event",event);
      innerHeight=10;
      innerWidth=1;
      return ('./assets/img/user.jpg')
  }
  
  
  

}
