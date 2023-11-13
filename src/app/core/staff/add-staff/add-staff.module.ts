import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { AddStaffRoutingModule } from './add-staff-routing.module';
import { AddStaffComponent } from './add-staff.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { EditLeaveModule } from '../edit-leave/edit-leave.module';
import { EditStaffModule } from '../edit-staff/edit-staff.module';
import { StaffHolidayModule } from '../staff-holiday/staff-holiday.module';
import { StaffAttendanceModule } from '../staff-attendance/staff-attendance.module';


@NgModule({
  declarations: [
    AddStaffComponent
  ],
  imports: [
    CommonModule,
    AddStaffRoutingModule,
    SharedModule,
    EditLeaveModule,
    EditStaffModule,
    StaffHolidayModule,
    StaffAttendanceModule,
    NgIf,
    FormsModule
  ]
})
export class AddStaffModule { }
