import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable, Subject } from 'rxjs';

import { environment } from 'src/environments/environment';


    



@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private _teacherMessage=new Subject<string>();
  teacherMsg$=this._teacherMessage.asObservable();
  private data = new BehaviorSubject('');
  currentData = this.data.asObservable();
 

private newAction=new BehaviorSubject<boolean>(false);
action=this.newAction.asObservable();


header:boolean=false;


  constructor(private httpClient: HttpClient) {
   this.action.subscribe(res=>{
      console.log(res,"response");
      this.header=res;
    });

   }

   

setAction(value:any){
  this.action= value;
  this.header=value;
  console.log("service action",this.newAction);
}

  updateList(item:any){
    this.data.next(item);
  }

sendMessage(message:string){
  this._teacherMessage.next(message);
}
  
}
