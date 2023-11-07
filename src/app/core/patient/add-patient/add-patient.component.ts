import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { Paciente } from '../paciente';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { patientService } from '../patient.service';
import { Router } from '@angular/router';
interface data {
  value: string ;
}
@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent {
  public routes = routes;
  dataSource = new MatTableDataSource<Paciente>;
paciente:Paciente = new Paciente();
registros: Paciente[] = [];
constructor(private auth:AuthService, private pacienteservice:patientService,private router:Router) { }
  public selectedValue! : string  ;
  selectedList1: data[] = [
    {value: 'Select  Department'},
    {value: 'Orthopedics'},
    {value: 'Radiology'},
    {value: 'Dentist'},
  ];
  selectedList2: data[] = [
    {value: 'Seleccionar '},
    {value: 'Alaska'},
    {value: 'Los Angeles'},
  ];
  selectedList3: data[] = [
    {value: 'Select Country'},
    {value: 'Usa'},
    {value: 'Uk'},
    {value: 'Italy'},
  ];
  selectedList4: data[] = [
    {value: 'Select State'},
    {value: 'Alaska'},
    {value: 'California'},
  ];
  
}
// public routes = routes;
// dataSource = new MatTableDataSource<Paciente>;
// paciente:Paciente = new Paciente();
// registros: Paciente[] = [];


// constructor(private auth:AuthService, private pacienteservice:patientService,private router:Router) { }