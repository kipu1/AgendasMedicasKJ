import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoCallRoutingModule } from './video-call-routing.module';
import { VideoCallComponent } from './video-call.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    VideoCallComponent
  ],
  imports: [
    CommonModule,
    VideoCallRoutingModule,
    SharedModule
  ]
})
export class VideoCallModule { }
