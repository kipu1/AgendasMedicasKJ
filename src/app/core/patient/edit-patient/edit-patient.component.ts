import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { routes } from 'src/app/shared/routes/routes';
import { patientService } from '../patient.service';
import { Paciente } from '../paciente';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  

  // identificacion: String;
   pacienteActualizado= new Paciente ();
  constructor(private auth: AuthService, private pacienteService: patientService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {


    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.obtenerpersona(); // Actualizar la lista después de la actualización
      this.pacienteService.Buscarid(this.id).subscribe(
        response => {
            this.paciente=response
       // Asigna los datos del paciente al modelo
      });
      // Ahora puedes usar el ID como desees en tu componente
    })

    
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
