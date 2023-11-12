import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

import { PatientsListRoutingModule } from './patients-list-routing.module';
import { PatientsListComponent } from './patients-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    PatientsListComponent
  ],
  imports: [
    CommonModule,
    PatientsListRoutingModule,
    SharedModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    NgFor, FormsModule,RouterModule ,CommonModule,MatTableModule, MatPaginatorModule,MatButtonModule,MatTableModule,
   
  ]
})
export class PatientsListModule { }
