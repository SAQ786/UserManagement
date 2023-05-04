import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyLoadingRoutingModule } from './lazy-loading-routing.module';
import { LazyComponent } from './lazy/lazy.component';


@NgModule({
  declarations: [
    LazyComponent
  ],
  imports: [
    CommonModule,
    LazyLoadingRoutingModule
  ]
})
export class LazyLoadingModule { }
