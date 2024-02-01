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
    username: new FormControl,
    userPassword: new FormControl
  });

  get f() {
    return this.form.controls;
  }

  constructor(public auth: AuthService) { }
  ngOnInit(): void {
    if (localStorage.getItem('authenticated')) {
      localStorage.removeItem('authenticated');
    }
  }

  public InicioSesion() {
<<<<<<< Updated upstream
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
=======
    const user = this.form.get('username')?.value as string;
    const pass = this.form.get('userPassword')?.value as string;

    if (!user && !pass) {
      Swal.fire('Por favor ingrese su usuario y contraseña.');
>>>>>>> Stashed changes
    }
    if (!user) {
      Swal.fire('Por favor ingrese su usuario.');
    }

    if (!pass) {
      Swal.fire('Por favor ingrese su contraseña.');
    }

    if (user && pass) {
      this.auth.login(user, pass);
      this.auth.setLoggedInDoctorName(user);
    }

  }
<<<<<<< Updated upstream
  
=======

  showPassword() {
    this.passwordClass = !this.passwordClass;
  }
>>>>>>> Stashed changes
}
