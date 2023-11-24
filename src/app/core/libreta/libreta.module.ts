import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibretaRoutingModule } from './libreta-routing.module';
import { LibretaComponent } from './libreta.component';



@NgModule({
  // declarations: [
  //   LibretaComponent
  // ],
  imports: [
    CommonModule,
    LibretaRoutingModule,
  
  ]
})
export class LibretaModule { }