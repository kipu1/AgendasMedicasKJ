import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from '../../authentication/register/Models/paciente';
import { AuthService } from 'src/app/shared/auth/auth.service';

import { Router } from '@angular/router';
import { patientService } from '../services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {
  dataSource = new MatTableDataSource<Paciente>;
  paciente:Paciente = new Paciente();
  registros: Paciente[] = [];


  constructor(private auth:AuthService, private pacienteservice:patientService,private router:Router) { }
}
