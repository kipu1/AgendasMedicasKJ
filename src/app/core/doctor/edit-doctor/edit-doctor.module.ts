import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditDoctorRoutingModule } from './edit-doctor-routing.module';
import { EditDoctorComponent } from './edit-doctor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditDoctorComponent
  ],
  imports: [
    CommonModule,
    EditDoctorRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class EditDoctorModule { }
