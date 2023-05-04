import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecondRoutingModule } from './second-routing.module';
import { UserComponent } from '../user/user.component';
import { FirstComponent } from '../first/first.component';
import { FirstModule } from './first/first.module';
import { SecondComponent } from './second.component';


@NgModule({
  declarations: [],
  exports:[SecondComponent],
  imports: [
    CommonModule,
    SecondRoutingModule,
    FirstModule,
    ],
  
  
})
export class SecondModule { }
