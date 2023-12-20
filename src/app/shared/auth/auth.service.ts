import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';
import { routes } from '../routes/routes';
import { HttpClient } from '@angular/common/http';
import { DoctorService } from 'src/app/authentication/register/Servicio/doctor.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/authentication/register/Models/Doctor';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private doctorLogeado: Doctor | null = null;

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

  public getDoctorLogeado(): Doctor | null {
    return this.doctorLogeado;
  }

  public login(nombre?: string, clavesecreta?: string): Observable<boolean> {
    return new Observable((observer) => {
      this.http.post('http://localhost:8080/auth/sign', { nombre, clavesecreta }).subscribe(
        (response: any) => {
          if (response.token) {
            console.log('Login successful. Doctor info:', response.doctor);
            localStorage.setItem('token', response.token);
            localStorage.setItem('authenticated', 'true');

            // Almacena la información del médico logeado
            this.doctorLogeado = response.doctor;

            Swal.fire('Bienvenido');
            this.router.navigate([routes.adminDashboard]);

            // Informa al observador que la autenticación fue exitosa
            observer.next(true);
            observer.complete();
          } else {
            localStorage.removeItem('token');
            localStorage.setItem('authenticated', 'false');
            console.log('Login failed');
            // Manejar falla de autenticación

            // Informa al observador que la autenticación falló
            observer.next(false);
            observer.complete();
          }
        },
        (error) => {
          console.error('Error during login:', error);
          Swal.fire('Error al iniciar sesion, por favor revise sus credenciales', 'error');

          // Informa al observador que la autenticación falló debido a un error
          observer.next(false);
          observer.complete();
        }
      );
    });
  }

  // Método para obtener la información del médico logeado
  public obtenerDoctorLogeado(): Doctor | null {
    return this.doctorLogeado;
  }
}