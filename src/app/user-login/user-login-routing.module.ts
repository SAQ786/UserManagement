import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login.component';

const routes: Routes = [
  {path:'login',component:UserLoginComponent}
];

@NgModule({
  imports: [],
  exports: [RouterModule]
})
export class UserLoginRoutingModule { }
