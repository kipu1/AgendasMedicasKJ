import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { AddPatientRoutingModule } from './add-patient-routing.module';
import { AddPatientComponent } from './add-patient.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocalizationDetailsModule } from '../../settings/localization-details/localization-details.module';
import { PaymentSettingsModule } from '../../settings/payment-settings/payment-settings.module';
import { EmailSettingsModule } from '../../settings/email-settings/email-settings.module';
import { FormsModule } from '@angular/forms';


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
    FormsModule
  ]
})
export class AddPatientModule { }
