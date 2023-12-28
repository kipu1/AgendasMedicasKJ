import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private router: Router, private auth: AuthService, private doctorsService: DoctorService) { }

  ngOnInit(): void {
    this.obtenerpersona();
  }

  public routes = routes;
  public CustomControler!: number | string | boolean;
  public passwordClass = false;
  public pinClass = false;
  public confirmPasswordClass = false
  public isValidConfirmPassword = false;
  doctors: Doctor[] = [];
  repetirClave = '';
  repetirPIN = '';

  errores = {
    matricula: '',
    telefono: '',
    email: '',
    clavesecreta: '',
    nombre: '',
    apellido: '',
    pin: '',
    especialidad: '',
    direccion: '',
    cfg: '',
    claveDiferente: '',
    pinDiferente: ''
  };

  public doctor: Doctor = new Doctor();

  registerForm = new FormGroup({
    nombre: new FormControl,
    clavesecreta: new FormControl,
    comentarios: new FormControl,
    direccion: new FormControl,
    especialidad: new FormControl,
    telefono: new FormControl,
    nombreUsuario: new FormControl,
    password: new FormControl,
    confirmPassword: new FormControl,
  })

  get f() {
    return this.registerForm.controls;
  }

  submit() {
    if (this.registerForm.value.password != this.registerForm.value.confirmPassword) {
      this.isValidConfirmPassword = true;
    } else {
      this.isValidConfirmPassword = false;
      this.auth.login();
    }
    if (!this.validarCampos()) {
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

  passwordFunc() {
    this.passwordClass = !this.passwordClass
  }

  confirmPasswordFunc() {
    this.confirmPasswordClass = !this.confirmPasswordClass
  }

  showPIN() {
    this.pinClass = !this.pinClass;
  }

  public create(): void {
    console.log(this.doctor);
    // Verificar si el formulario está completo antes de redirigir al login
    if (!this.validarCampos()) {
      this.doctorsService.crear(this.doctor).subscribe(
        () => {
          // Se ejecutará si la creación es exitosa
          Swal.fire('Se registró con exito')
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
      //Swal.fire('Verifique todos los campos');
    }
    if (this.validarCampos()) {
      // Mostrar un mensaje de error o realizar otra acción
      return;
    }
  }

  validarCampos(): boolean {
    let camposInvalidos = false;

    if (!this.doctor.telefono) {
      this.errores.telefono = 'Ingrese un número de telefono';
      camposInvalidos = true;
    } else {
      const telefonoExistente = this.doctors.some(p => p.telefono === this.doctor.telefono);
      if (telefonoExistente) {
        this.errores.telefono = 'El número de teléfono ya está registrado';
        camposInvalidos = true;
      } else {
        this.errores.telefono = '';
      }
    }

    if (!this.doctor.matricula) {
      this.errores.matricula = 'Ingrese la matricula';
      camposInvalidos = true;
    } else {
      // Verificar si la cédula ya está registrada
      const cedulaExistente = this.doctors.some(p => p.matricula === this.doctor.matricula);
      if (cedulaExistente) {
        this.errores.matricula = 'El número de matricula ya está registrado';
        camposInvalidos = true;
      } else {
        this.errores.matricula = '';
      }
    }

    //Nuevas validaciones
    if (!this.doctor.especialidad) {
      this.errores.especialidad = 'Seleccione una especialidad';
      camposInvalidos = true;
    } else {
      this.errores.especialidad = '';
    }

    const nombreInput = this.doctor.nombre;
    if (nombreInput != null) {
      if (/\d/.test(nombreInput)) {
        this.errores.nombre = 'Ingrese un nombre y apellido válido';
        camposInvalidos = true;
      } else {
        this.errores.nombre = '';
      }
    } else {
      this.errores.nombre = 'El nombre y apellido son obligatorios';
      camposInvalidos = true;
    }

    const emailInput = this.doctor.email;
    if (emailInput != null) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput)) {
        this.errores.email = 'Ingrese una dirección de correo electrónico válida';
        camposInvalidos = true;
      } else {
        const emailExistente = this.doctors.some(p => p.email === this.doctor.email);
        if (emailExistente) {
          this.errores.email = 'El correo electrónico ya está registrado';
          camposInvalidos = true;
        } else {
          this.errores.matricula = '';
        }
      }
    } else {
      this.errores.email = 'El campo de correo electrónico es obligatorio';
      camposInvalidos = true;
    }

    if (!this.doctor.direccion) {
      this.errores.direccion = 'Ingrese una dirección';
      camposInvalidos = true;
    } else {
      this.errores.direccion = '';
    }

    const claveInput = this.doctor.clavesecreta;
    const claveRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (claveInput != null) {
      if (!claveRegex.test(claveInput)) {
        this.errores.clavesecreta = 'Ingrese un clave válida (8 caracteres mínimo - Al menos una letra en mayúscula y minúscula y un número)';
        camposInvalidos = true;
      } else if (this.doctor.clavesecreta !== this.repetirClave) {
        this.errores.claveDiferente = 'Las contraseñas no coinciden';
        camposInvalidos = true;
      } else {
        this.errores.claveDiferente = '';
      }
    } else {
      this.errores.clavesecreta = 'La clave es obligatoria';
      camposInvalidos = true;
    }

    const pinInput = this.doctor.cfg;
    if (pinInput != null) {
      if (this.doctor.cfg !== this.repetirPIN) {
        this.errores.pinDiferente = 'El PIN no coincide';
        camposInvalidos = true;
      } else {
        this.errores.pinDiferente = '';
      }
    } else {
      this.errores.cfg = 'El PIN es obligatorio';
    }
    return camposInvalidos;
  }

  limpiarErrores(campo: string): void {
    switch (campo) {
      case 'matricula':
        this.errores.matricula = '';
        break;
      case 'telefono':
        this.errores.telefono = '';
        break;
      case 'email':
        this.errores.email = '';
        break;
      case 'nombre':
        this.errores.nombre = '';
        break;
      case 'clave':
        this.errores.clavesecreta = '';
        break;
      case 'direccion':
        this.errores.direccion = '';
        break;
      case 'rePin':
        this.errores.pinDiferente = '';
        break;
      case 'pin':
        this.errores.cfg = '';
        break;
        case 'espe':
          this.errores.especialidad = '';
          break;
    }
  }
  /*
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
    }*/

}
