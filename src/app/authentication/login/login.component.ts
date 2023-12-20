import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { routes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public routes = routes;
  public passwordClass = false;

  form = new FormGroup({
   /* email: new FormControl('jenny', [
      Validators.required,
      //Validators.email,
    ]),
    password: new FormControl('1234', [Validators.required]),*/

    nombreUsuario: new FormControl,
    clavesecreta: new FormControl
  });

  get f() {
    return this.form.controls;
  }

  constructor(public auth: AuthService) {}
  ngOnInit(): void {
    if (localStorage.getItem('authenticated')) {
      localStorage.removeItem('authenticated');
    }
  }

  /*loginFormSubmit() {
    if (this.form.valid) {
      this.auth.login;
    }
  }
  togglePassword() {
    this.passwordClass = !this.passwordClass;
  }*/

  public InicioSesion() {
    const nombreUsuario = this.form.get('nombreUsuario')?.value as string;
    const clavesecreta = this.form.get('clavesecreta')?.value as string;
  
    if (nombreUsuario && clavesecreta) {
      this.auth.login(nombreUsuario, clavesecreta);
    } else {
      if (!nombreUsuario && !clavesecreta) {
        Swal.fire('Por favor ingrese su nombre,apellido y clave');
      } else if (!nombreUsuario) {
        Swal.fire('Por favor ingrese su nombre,apellido');
      } else {
        Swal.fire('Por favor ingrese su clave');
      }
      // Puedes agregar más mensajes según sea necesario
    }
  }
  
}
