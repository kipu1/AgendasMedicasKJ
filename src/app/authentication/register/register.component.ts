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
//
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
    
  }
  passwordFunc(){
    this.passwordClass = !this.passwordClass
  }
  confirmPasswordFunc(){
    this.confirmPasswordClass = !this.confirmPasswordClass
  }

  ngOnInit(): void {
    
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
      this.router.navigate([this.routes.login]).then(() => {
        window.location.reload();
      });
  
      this.doctorsService.crear(this.doctor).subscribe(
        () => {
          Swal.fire('Doctor creado exitosamente', 'success');
        },
        (error) => {
          Swal.fire('Error al crear el doctor', 'error');
          console.error(error);
        }
      );
    } else {
      // Manejar el caso en que el formulario no esté completo
      Swal.fire('Por favor complete todos los campos del formulario', 'warning');
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
  

  
  
}
