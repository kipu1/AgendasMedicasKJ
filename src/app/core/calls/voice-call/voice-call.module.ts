import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoiceCallRoutingModule } from './voice-call-routing.module';
import { VoiceCallComponent } from './voice-call.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { materialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    VoiceCallComponent
  ],
  imports: [
    CommonModule,
    VoiceCallRoutingModule,
    SharedModule,
    materialModule,
    FormsModule, ReactiveFormsModule,

    MatFormFieldModule,MatSelectModule
  ]
})
export class VoiceCallModule { }
