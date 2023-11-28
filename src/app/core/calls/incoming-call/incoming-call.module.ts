import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomingCallRoutingModule } from './incoming-call-routing.module';
import { IncomingCallComponent } from './incoming-call.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    IncomingCallComponent
  ],
  imports: [
    CommonModule,
    IncomingCallRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class IncomingCallModule { }
