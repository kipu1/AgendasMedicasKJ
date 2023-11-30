import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';

import { AddPatientRoutingModule } from './add-patient-routing.module';
import { AddPatientComponent } from './add-patient.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocalizationDetailsModule } from '../../settings/localization-details/localization-details.module';
import { PaymentSettingsModule } from '../../settings/payment-settings/payment-settings.module';
import { EmailSettingsModule } from '../../settings/email-settings/email-settings.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    AddPatientComponent
  ],
  imports: [
    CommonModule,
    AddPatientRoutingModule,
    SharedModule,
    LocalizationDetailsModule,
    PaymentSettingsModule,
    EmailSettingsModule,
    NgIf,
    FormsModule,
    NgFor, FormsModule ,CommonModule,MatTableModule, MatPaginatorModule,MatButtonModule,MatFormFieldModule,MatTableModule,ReactiveFormsModule
    
  ]
})
export class AddPatientModule { }
