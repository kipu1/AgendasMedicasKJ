import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { StaffHolidayRoutingModule } from './staff-holiday-routing.module';
import { StaffHolidayComponent } from './staff-holiday.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StaffHolidayComponent
  ],
  imports: [
    CommonModule,
    StaffHolidayRoutingModule,
    SharedModule,
    NgIf,
    FormsModule 
  ],exports:[
    StaffHolidayComponent
  ]
})
export class StaffHolidayModule { }
