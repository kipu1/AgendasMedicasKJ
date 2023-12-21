import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';
import { routes } from '../routes/routes';
import { HttpClient } from '@angular/common/http';
import { DoctorService } from 'src/app/authentication/register/Servicio/doctor.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient, private doctorService: DoctorService) {}

 /* public login(): void {
    // localStorage.setItem('authenticated', 'true');
    // this.router.navigate([routes.adminDashboard]);
   // {username: 'jenny', password: '1234'  }


    this.http.post('http://localhost:8080/auth/signIn', {username: 'jenny', password: '1234'  }).subscribe((response:any) => {
        if (response.token) {
          console.log(response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('authenticated', 'true');
          this.router.navigate([routes.adminDashboard]);
        } else {
            localStorage.removeItem('token');
            localStorage.setItem('authenticated', 'false');
          //this.router.navigate([routes.login]);
        }
        //return callback && callback();
    });
    
  }**/

  

  public login(nombre?: string, clavesecreta?: string): void {
    this.http.post('http://localhost:8080/auth/sign', { nombre, clavesecreta}).subscribe(
      (response: any) => {
        if (response.token) {
          console.log(response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('authenticated', 'true');
          Swal.fire('Bienvenido');
          this.router.navigate([routes.adminDashboard]);
        } else {
          localStorage.removeItem('token');
          localStorage.setItem('authenticated', 'false');
          // Manejar falla de autenticación
        }
      },
      (error) => {
        // Manejar error de inicio de sesión
        console.error('Error al iniciar sesión:', error );
        Swal.fire('Error al iniciar sesion,por favor revise sus credenciales', 'error');
        console.error(error);
      }
    );
  }

}
