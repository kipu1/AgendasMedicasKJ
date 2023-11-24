import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddDepartmentRoutingModule } from './add-department-routing.module';
import { AddDepartmentComponent } from './add-department.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { materialModule } from 'src/app/shared/material.module';


@NgModule({
  declarations: [
    AddDepartmentComponent
  ],
  imports: [
    CommonModule,
    AddDepartmentRoutingModule,
    SharedModule,
    MatFormFieldModule,MatSelectModule,
    materialModule,
    FormsModule
  ]
})
export class AddDepartmentModule { }
