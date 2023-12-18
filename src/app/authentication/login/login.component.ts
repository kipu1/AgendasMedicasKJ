import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { routes } from 'src/app/shared/routes/routes';

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
   // nombre: String, clave: String
     const nombreUsuario = this.form.get('nombreUsuario')?.value as string;
     const clavesecreta = this.form.get('clavesecreta')?.value as string;
    if (nombreUsuario && clavesecreta) {
      this.auth.login(nombreUsuario,clavesecreta);
    } else {
      // Manejar el caso en el que los controles del formulario sean nulos
    }
  }
}
