import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

import { DoctorsListRoutingModule } from './doctors-list-routing.module';
import { DoctorsListComponent } from './doctors-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    DoctorsListComponent
  ],
  imports: [
    CommonModule,
    DoctorsListRoutingModule,
    SharedModule,  
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    NgFor, FormsModule,RouterModule ,CommonModule,MatTableModule, MatPaginatorModule,MatButtonModule,MatTableModule,
  ]
})
export class DoctorsListModule { }
