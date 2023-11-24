import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

import { StaffListRoutingModule } from './staff-list-routing.module';
import { StaffListComponent } from './staff-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    StaffListComponent
  ],
  imports: [
    CommonModule,
    StaffListRoutingModule,
    SharedModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    NgFor, FormsModule,RouterModule ,CommonModule,MatTableModule, MatPaginatorModule,MatButtonModule,MatTableModule,  FormsModule
  ]
})
export class StaffListModule { }
