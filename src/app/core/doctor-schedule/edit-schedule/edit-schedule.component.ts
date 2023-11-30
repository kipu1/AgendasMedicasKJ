import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { routes } from 'src/app/shared/routes/routes';
import { Libreta } from '../libreta';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { LibretaService } from '../libreta.service';
import { ActivatedRoute, Router } from '@angular/router';
interface data {
  value: string ;
}
@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.scss']
})
export class EditScheduleComponent {
  public routes = routes;
  id!: number;
 libreta: Libreta = new Libreta();
 libretas: Libreta[] = [];
  validador: boolean = false;
  

  // identificacion: String;
   pacienteActualizado= new Libreta ();
  constructor(private auth: AuthService, private libretaService: LibretaService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {


    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.obtenerpersona(); // Actualizar la lista después de la actualización
      this.libretaService.Buscarid(this.id).subscribe(
        response => {
            this.libreta=response
       // Asigna los datos del paciente al modelo
      });
      // Ahora puedes usar el ID como desees en tu componente
    })

    
      this.obtenerpersona(); // Actualizar la lista después de la actualización
  
      // Restablecer los valores del objeto this.paciente
    
  }
  redirigir() {
    let url = this.libreta.web.trim();

    // Verificar si la URL tiene el protocolo, si no, agregar http:// por defecto
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'http://' + url;
    }

    // Abrir la URL en otra pestaña
    if (url) {
      window.open(url, '_blank');
    }
  }


  obtenerpersona() {
    this.libretaService.obtenerListaPersona().subscribe(dato => {
      this.libretas = dato;
    });
  }



  actualizarDatos(idLibreta: number): void {
    console.log('Datos actualizados:', idLibreta);
    const nuevonombre = this.libreta.nombre;
    const nuevoclavesecre = this.libreta.telefono;
    const nuevocomentario = this.libreta.celular;

   
    const nuevadireccion = this.libreta.email;
    const nuevaespecialidad = this.libreta.web;
    const nuevotelefono = this.libreta.direccion;
    const nuvaclave = this.libreta.notas;
   

 
    
    // const nuevoSexo = this.paciente.sexo;
  

    // Crear un objeto 'pacienteActualizado' con los valores actualizados
    this.pacienteActualizado.nombre=nuevonombre;
  
    this.pacienteActualizado.telefono=nuevoclavesecre;
    this.pacienteActualizado.celular=nuevocomentario;
   
    this.pacienteActualizado.email=nuevadireccion;
    this.pacienteActualizado.web=nuevaespecialidad;
    this.pacienteActualizado.direccion=nuevotelefono;
    this.pacienteActualizado.notas=nuvaclave;
  



    // Llamar al método actualizarPersona() del servicio para enviar los datos actualizados al servidor
    this.libretaService.actualizarPersona(this.id,this.pacienteActualizado).subscribe(
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

