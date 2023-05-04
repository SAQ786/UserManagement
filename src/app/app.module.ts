import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserAuthModule } from './user-auth/user-auth.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { UserLoginComponent } from './user-login/user-login.component';
import { UserComponent } from './user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';
import { HttpClientModule } from '@angular/common/http'; 

import { ModalModule } from 'ngx-bootstrap/modal'; 
import { HttpsInterceptor } from './https.interceptor';
import{GoogleMapsModule} from '@angular/google-maps';
import { AgmCoreModule } from '@agm/core';
import { UserMapComponent } from './user-map/user-map.component';
import { ToastrModule } from 'ngx-toastr';






//import { userInterface } from './userInterface';
@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    SecondComponent,
    PageNotFoundComponent,
    UserLoginComponent,
    UserComponent,
    PopupComponent,
    UserMapComponent,

    
  ],
  imports: [
    BrowserModule, 
    ModalModule.forRoot(),
    AppRoutingModule,
    UserAuthModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    GoogleMapsModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyC2wYvlkGMNZKOvpnFs07w6JjSBz9BIQcQ'
    }),
    ToastrModule.forRoot()
    
 
    
    
  ],
  providers: [HttpsInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
