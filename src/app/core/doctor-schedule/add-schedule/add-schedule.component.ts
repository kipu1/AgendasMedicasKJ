import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { Libreta } from '../libreta';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { LibretaService } from '../libreta.service';
import { Router } from '@angular/router';
interface data {
  value: string ;
}
@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss']
})
export class AddScheduleComponent {
  public routes = routes;
  libreta: Libreta = new Libreta();
  libretas: Libreta[] = [];
  validador: boolean = false;
  // identificacion: String;
  //change components


  constructor(private auth: AuthService, private libretaService: LibretaService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerpersona();

  }

  obtenerpersona() {
    this.libretaService.obtenerListaPersona().subscribe(dato => {
      this.libretas = dato;
    });
  }

 

  guardardoctor() {
    console.log(this.libreta); // Verificar los valores de los campos

    var nombre = this.libreta.nombre;
    var clavesecreta = this.libreta.telefono;
    var comentarios = this.libreta.celular;
    var direccion = this.libreta.email;
    var especialidad = this.libreta.web;
    var telefono = this.libreta.telefono;
    var clave = this.libreta.direccion;
    var notaAuto = this.libreta.notas;
   
 
   





    // Código para guardar la persona
    this.libretaService.registrarPersona(this.libreta).subscribe(dato => {
      this.obtenerpersona();
    }, error => {

      console.log(error);
      alert('La persona ha sido guardada correctamente');

      // Llamada al método para obtener la lista de personas después de guardar una nueva persona
    },

    );

    this.libreta.nombre = '';
    this.libreta.telefono = '';
    this.libreta.celular = '';
    this.libreta.email = '';
    this.libreta.web = '';
    this.libreta.direccion = '';
    this.libreta.notas = '';
    


  }



  onSubmit() {
    this.guardardoctor();
  }
}

