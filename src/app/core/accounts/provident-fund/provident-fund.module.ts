import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

import { ProvidentFundRoutingModule } from './provident-fund-routing.module';
import { ProvidentFundComponent } from './provident-fund.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProvidentFundComponent
  ],
  imports: [
    CommonModule,
    ProvidentFundRoutingModule,
    SharedModule,  
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    NgFor, FormsModule,RouterModule ,CommonModule,MatTableModule, MatPaginatorModule,MatButtonModule,MatTableModule,
  ]
})
export class ProvidentFundModule { }
