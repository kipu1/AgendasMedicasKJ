import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { routes } from 'src/app/shared/routes/routes';
import { patientService } from '../patient.service';
import { Paciente } from '../paciente';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
interface data {
  value: string ;
}
@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent {
  public routes = routes;
  id!: number;
  paciente: Paciente = new Paciente();
  pacientes: Paciente[] = [];
  validador: boolean = false;
  pacientec: Paciente = {
    apellido: '',
    idPaciente: 0,
    nombre: '',
    documento: '',
    grupo: '',
    sexo: '',
    direccion: '',
    cp: '',
    obra: '',
    afiliado: '',
    telefono1: '',
    telefono2: '',
    telefono3: '',
    clinicos: '',
    diagnostico: '',
    cormobilidades: '',
    familiar: '',
    comentarios: '',
    extra1: '',
    extra2: '',
    extra3: '',
    extra4: '',
    extra5: '',
    extra6: '',
    extra7: '',
    extra8: '',
    extra9: '',
    extra10: '',
    civil: '',
    campoCfg1: '',
    campoCfg2: '',
    campoCfg3: '',
    tipodocumento: '',
    abrir: ''
  };

  // identificacion: String;
   pacienteActualizado= new Paciente ();
  constructor(private auth: AuthService, private pacienteService: patientService, private router: Router) { }

  ngOnInit(): void {

    
      this.obtenerpersona(); // Actualizar la lista después de la actualización
  
      // Restablecer los valores del objeto this.paciente
    
  }
   


  obtenerpersona() {
    this.pacienteService.obtenerListaPersona().subscribe(dato => {
      this.pacientes = dato;
    });
  }



  actualizarDatos(idPaciente: number): void {
    console.log('Datos actualizados:', idPaciente);
    const nuevoApellido = this.paciente.apellido;
    const nuevoNombre = this.paciente.nombre;
    const nuevoTipoDocumento = this.paciente.tipodocumento;

   
    const nuevoDocumento = this.paciente.documento;
    const nuevoGrupo = this.paciente.grupo;
    const nuevoSexo = this.paciente.sexo;
  

    // Crear un objeto 'pacienteActualizado' con los valores actualizados

    this.pacienteActualizado.apellido=nuevoApellido;

    // Llamar al método actualizarPersona() del servicio para enviar los datos actualizados al servidor
    this.pacienteService.actualizarPersona(this.pacienteActualizado).subscribe(
        response => {
            console.log('Datos actualizados:', this.pacienteActualizado);
            // Realizar cualquier otra lógica necesaria después de la actualización exitosa
        },
        error => {
            console.error('Error al actualizar los datos:', error);
            // Manejar el error de alguna manera apropiada en tu aplicación
        }
    );
}  }
