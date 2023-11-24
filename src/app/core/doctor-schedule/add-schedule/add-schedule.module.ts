import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

import { AddScheduleRoutingModule } from './add-schedule-routing.module';
import { AddScheduleComponent } from './add-schedule.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AddScheduleComponent,
  ],
  imports: [
    CommonModule,
    AddScheduleRoutingModule,
    SharedModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    NgFor, FormsModule,RouterModule ,CommonModule,MatTableModule, MatPaginatorModule,MatButtonModule,MatTableModule
   
  ]
})
export class AddScheduleModule { }
