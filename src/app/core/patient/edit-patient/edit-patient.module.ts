import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditPatientRoutingModule } from './edit-patient-routing.module';
import { EditPatientComponent } from './edit-patient.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditPatientComponent
  ],
  imports: [
    CommonModule,
    EditPatientRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class EditPatientModule { }
