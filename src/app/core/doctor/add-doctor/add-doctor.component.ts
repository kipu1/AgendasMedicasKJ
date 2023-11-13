import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { Doctor } from '../doctor';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { DoctorService } from '../doctor.service';
import { Router } from '@angular/router';
interface data {
  value: string ;
}
@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent {
  public routes = routes;
  doctor: Doctor = new Doctor();
  doctores: Doctor[] = [];
  validador: boolean = false;
  // identificacion: String;
  //change components


  constructor(private auth: AuthService, private doctorService: DoctorService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerpersona();

  }

  obtenerpersona() {
    this.doctorService.obtenerListaPersona().subscribe(dato => {
      this.doctores = dato;
    });
  }

 

  guardardoctor() {
    console.log(this.doctor); // Verificar los valores de los campos

    var nombre = this.doctor.nombre;
    var clavesecreta = this.doctor.clavesecreta;
    var comentarios = this.doctor.comentarios;
    var direccion = this.doctor.direccion;
    var especialidad = this.doctor.especialidad;
    var telefono = this.doctor.telefono;
    var clave = this.doctor.clave;
    var notaAuto = this.doctor.notaAuto;
    var nota = this.doctor.nota;
    var comparte = this.doctor.comparte;
    var cfg = this.doctor.cfg;
    var cfgsec = this.doctor.cfgsec;
    var email = this.doctor.email;
    var matricula = this.doctor.matricula;
   





    // Código para guardar la persona
    this.doctorService.registrarPersona(this.doctor).subscribe(dato => {
      this.obtenerpersona();
    }, error => {

      console.log(error);
      alert('La persona ha sido guardada correctamente');

      // Llamada al método para obtener la lista de personas después de guardar una nueva persona
    },

    );

    this.doctor.nombre = '';
    this.doctor.clavesecreta = '';
    this.doctor.comentarios = '';
    this.doctor.direccion = '';
    this.doctor.especialidad = '';
    this.doctor.telefono = '';
    this.doctor.clave = '';
    this.doctor.notaAuto = '';
    this.doctor.nota = '';
    this.doctor.comparte = '';
    this.doctor.cfg = '';
    this.doctor.cfgsec = '';
    this.doctor.email = '';
    this.doctor.matricula = '';

  }



  onSubmit() {
    this.guardardoctor();
  }
}
