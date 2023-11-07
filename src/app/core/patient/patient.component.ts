import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from './paciente';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { patientService } from './patient.service';
import { Router } from '@angular/router';

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
