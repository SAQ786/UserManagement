import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './user-auth/login/login.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AuthGuard } from './auth/auth.guard';
import { AppComponent } from './app.component';
import { UnAuthorigedComponent } from './un-authoriged/un-authoriged.component';
import { UserComponent } from './user/user.component';
import { UserMapComponent } from './user-map/user-map.component';


const routes: Routes = [
  {path:'home',component:AppComponent},
  { 
    path: 'registration',component:FirstComponent
 },
  { path:'detail',canActivate:[AuthGuard], component: SecondComponent,
 
},
  {path:'login', component:UserLoginComponent },
  {  
    path:'lazy-lading',
    loadChildren:()=>import('./lazy-loading/lazy-loading.module').then(m => m.LazyLoadingModule)
  },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  {path:'unAuthoriged', component:UnAuthorigedComponent},
  {path:'profile/:id',canActivate:[AuthGuard], component:UserComponent},
  {path:'location', component:UserMapComponent},
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
