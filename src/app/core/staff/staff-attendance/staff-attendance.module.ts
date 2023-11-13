import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { StaffAttendanceRoutingModule } from './staff-attendance-routing.module';
import { StaffAttendanceComponent } from './staff-attendance.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StaffAttendanceComponent
  ],
  imports: [
    CommonModule,
    StaffAttendanceRoutingModule,
    SharedModule,
    NgIf,
    FormsModule 
  ],exports:[
    StaffAttendanceComponent
  ]
})
export class StaffAttendanceModule { }
