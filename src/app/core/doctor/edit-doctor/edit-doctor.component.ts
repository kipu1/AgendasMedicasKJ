import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { DoctorService } from '../doctor.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '../doctor';
interface data {
  value: string ;
}
@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.scss']
})
export class EditDoctorComponent {
  public routes = routes;
  id!: number;
  doctor: Doctor = new Doctor();
  doctores: Doctor[] = [];
  validador: boolean = false;
  

  // identificacion: String;
   pacienteActualizado= new Doctor ();
  constructor(private auth: AuthService, private doctorService: DoctorService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {


    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.obtenerpersona(); // Actualizar la lista después de la actualización
      this.doctorService.Buscarid(this.id).subscribe(
        response => {
            this.doctor=response
       // Asigna los datos del paciente al modelo
      });
      // Ahora puedes usar el ID como desees en tu componente
    })

    
      this.obtenerpersona(); // Actualizar la lista después de la actualización
  
      // Restablecer los valores del objeto this.paciente
    
  }
   


  obtenerpersona() {
    this.doctorService.obtenerListaPersona().subscribe(dato => {
      this.doctores = dato;
    });
  }



  actualizarDatos(idDoctor: number): void {
    console.log('Datos actualizados:', idDoctor);
    const nuevonombre = this.doctor.nombre;
    const nuevoclavesecre = this.doctor.clavesecreta;
    const nuevocomentario = this.doctor.comentarios;

   
    const nuevadireccion = this.doctor.direccion;
    const nuevaespecialidad = this.doctor.especialidad;
    const nuevotelefono = this.doctor.telefono;
    const nuvaclave = this.doctor.clave;
    const nuevanotaauto = this.doctor.notaAuto;
    const nuevanota = this.doctor.nota;
    const nuevocomparte = this.doctor.comparte;
    const nuevocfg = this.doctor.cfg;
    const nuevocfgsec = this.doctor.cfgsec;
    const nuevoemail = this.doctor.email;
    const nuevamatricula = this.doctor.matricula;
 
    
    // const nuevoSexo = this.paciente.sexo;
  

    // Crear un objeto 'pacienteActualizado' con los valores actualizados
    this.pacienteActualizado.nombre=nuevonombre;
  
    this.pacienteActualizado.clavesecreta=nuevoclavesecre;
    this.pacienteActualizado.comentarios=nuevocomentario;
   
    this.pacienteActualizado.direccion=nuevadireccion;
    this.pacienteActualizado.especialidad=nuevaespecialidad;
    this.pacienteActualizado.telefono=nuevotelefono;
    this.pacienteActualizado.clave=nuvaclave;
    this.pacienteActualizado.notaAuto=nuevanotaauto;
    this.pacienteActualizado.nota=nuevanota;
    this.pacienteActualizado.comparte=nuevocomparte;
    this.pacienteActualizado.cfg=nuevocfg;
    this.pacienteActualizado.cfgsec=nuevocfgsec;
    this.pacienteActualizado.email=nuevoemail;
    this.pacienteActualizado.matricula=nuevamatricula;


    // Llamar al método actualizarPersona() del servicio para enviar los datos actualizados al servidor
    this.doctorService.actualizarPersona(this.id,this.pacienteActualizado).subscribe(
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
