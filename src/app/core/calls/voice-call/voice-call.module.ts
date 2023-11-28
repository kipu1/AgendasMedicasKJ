import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoiceCallRoutingModule } from './voice-call-routing.module';
import { VoiceCallComponent } from './voice-call.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { materialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [
    VoiceCallComponent
  ],
  imports: [
    CommonModule,
    VoiceCallRoutingModule,
    SharedModule,
    materialModule,
    FormsModule, ReactiveFormsModule, MatInputModule,MatAutocompleteModule ,

    MatFormFieldModule,MatSelectModule
  ]
 
})
export class VoiceCallModule { }
