import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { EditStaffRoutingModule } from './edit-staff-routing.module';
import { EditStaffComponent } from './edit-staff.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditStaffComponent
  ],
  imports: [
    CommonModule,
    EditStaffRoutingModule,
    SharedModule,
    NgIf,
    FormsModule 
  ],exports:[
    EditStaffComponent
  ]
})
export class EditStaffModule { }
