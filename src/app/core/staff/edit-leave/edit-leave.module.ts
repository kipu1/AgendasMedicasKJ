import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { EditLeaveRoutingModule } from './edit-leave-routing.module';
import { EditLeaveComponent } from './edit-leave.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditLeaveComponent
  ],
  imports: [
    CommonModule,
    EditLeaveRoutingModule,
    SharedModule,
    NgIf,
    FormsModule 
  ],exports:[
    EditLeaveComponent
  ]
})
export class EditLeaveModule { }
