import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { routes } from 'src/app/shared/routes/routes';
import { Doctor } from './Models/Doctor';
import { DoctorService } from './Servicio/doctor.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public routes = routes;
  public CustomControler!: number | string | boolean ;
  public passwordClass  = false;
  public confirmPasswordClass  = false
  public isValidConfirmPassword = false;
  doctors: Doctor[] = [];
  
//
errores = {

  matricula: '',
  telefono:'',
  email:''
  
};
public doctor: Doctor = new Doctor();

  form = new FormGroup({
    nombre: new FormControl,
    clavesecreta: new FormControl,
    comentarios: new FormControl,
    direccion: new FormControl,
    especialidad : new FormControl,
    telefono:new FormControl,
    nombreUsuario:new FormControl,
    password: new FormControl,
    confirmPassword: new FormControl,
  })

  get f() {
    return this.form.controls;
  }

  constructor(private router:Router,private auth: AuthService,private  doctorsService: DoctorService) { }

  
  submit() {
    if (this.form.value.password != this.form.value.confirmPassword) {
      this.isValidConfirmPassword = true;
    } else {
      this.isValidConfirmPassword = false;
      this.auth.login();
    }
    if (!this.vvalidarCampos()) {
      // Si la validación falla, no continuar con el envío
      return;
  } 
  this.create();
}
obtenerpersona() {
  this.doctorsService.obtenerListaPersona().subscribe(dato => {
    this.doctors = dato;
  });
}
  passwordFunc(){
    this.passwordClass = !this.passwordClass
  }
  confirmPasswordFunc(){
    this.confirmPasswordClass = !this.confirmPasswordClass
  }

  ngOnInit(): void {
    this.obtenerpersona();
  }

  /*public create(): void{
    this.doctorsService.crear(this.doctor).subscribe( 
      () =>{
        Swal.fire ('Doctor creado exitosamente' , 'sucess')
      }
    )
  }*/

  public create(): void {
    
    // Verificar si el formulario está completo antes de redirigir al login
    if (this.isFormComplete()) {
      this.doctorsService.crear(this.doctor).subscribe(
        () => {
          // Se ejecutará si la creación es exitosa
          Swal.fire('Se registro con exito')
            .then(() => {
              // Redirigir al usuario al login después de mostrar el mensaje
              this.router.navigate([this.routes.login]).then(() => {
                window.location.reload();
              });
            });
        },
        (error) => {
          Swal.fire('Error al crear el doctor');
          console.error(error);
        }
      );
    } else {
      // Manejar el caso en que el formulario no esté completo
      Swal.fire('Ingrese el nombre, apellido y la clave ');
    }
    if (this.vvalidarCampos()) {
      // Mostrar un mensaje de error o realizar otra acción
      return;
    }
  }
  
  private isFormComplete(): boolean {
    // Verificar que todos los campos necesarios estén completos
    return (
      !!this.doctor.nombre &&
      !!this.doctor.clavesecreta
      // Agrega más condiciones según sea necesario
    );
  }
  vvalidarCampos(): boolean {
    let camposInvalidos = false;
   
    if (!this.doctor.telefono) {
      this.errores.telefono = 'Ingrese el telefonotelefono';
      camposInvalidos = true;
    } else {
      this.errores.telefono = '';
    }
  
    if (!this.doctor.email) {
      this.errores.email = 'Ingrese el email';
      camposInvalidos = true;
    } else {
      this.errores.email = '';
    }
    
      if (!this.doctor.matricula) {
        this.errores.matricula = 'Ingrese la matricula';
        camposInvalidos = true;
      } else {
        // Verificar si la cédula ya está registrada
        const cedulaExistente = this.doctors.some(p => p.matricula === this.doctor.matricula);
        if (cedulaExistente) {
          this.errores.matricula = 'El número de matricula ya está registrado.';
          camposInvalidos = true;
        } else {
          this.errores.matricula = '';
        }
      
     
    }
    return camposInvalidos;
  }
  limpiarErrores(campo: string): void {
   if (campo === 'matricula') {
      this.errores.matricula = '';
    }else if (campo === 'telefono') {
      this.errores.telefono = '';
    }else if (campo === 'email') {
      this.errores.email = '';
    }
    
  }
  
  verificarmatriculaExistente() {
    // Verifica si doctor y doctor.id son diferentes de undefined
    if (this.doctor && this.doctor.id !== undefined) {
      // Realiza la llamada al servicio para verificar si la cédula ya está registrada
      this.doctorsService.Buscarid(this.doctor.id).subscribe(
        (respuesta: any) => {
          if (respuesta.existe) {
            this.errores.matricula = 'El número de matrícula ya está registrado.';
            this.errores.email = 'El número de matrícula ya está registrado.';
            this.errores.telefono = 'El número de matrícula ya está registrado.';
          }
        },
        (error: any) => {
          console.error('Error al verificar la matrícula:', error);
        }
      );
    } else {
      console.error('El ID del doctor es undefined o null');
    }
  }
  
}
  