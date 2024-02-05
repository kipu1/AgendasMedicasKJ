import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { routes } from 'src/app/shared/routes/routes';
import { Doctor } from './Models/Doctor';
import { DoctorService } from './Servicio/doctor.service';
import Swal from 'sweetalert2';
import { persona } from './Models/persona';
import { PersonaService } from 'src/app/core/services/persona.service';
import { rol } from './Models/rol';
import { usuario } from './Models/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { RolService } from 'src/app/core/services/rol.service';
import { NewUser } from './Models/NewUser.model';
import { forkJoin, tap } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService, private doctorsService: DoctorService,
    private personService: PersonaService, private usuarioService: UsuarioService, private rolService: RolService) { }

  ngOnInit(): void {
    this.obtenerPersona();
  }

  public routes = routes;
  public CustomControler!: number | string | boolean;
  public passwordClass = false;
  public pinClass = false;
  public confirmPasswordClass = false
  public isValidConfirmPassword = false;

  doctors: Doctor[] = [];
  persons: persona[] = [];
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

  //Objects for register
  //public doctor: Doctor = new Doctor();
  //public doctor2: Doctor = new Doctor();
  public rol: rol = new rol();
  public persona: persona = new persona();
  public usuario: usuario = new usuario();
  //public newUser: NewUser = new NewUser();
  newUser: NewUser = {};
  doctor: Doctor = {};
  personId?: number
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

  obtenerPersona() {
    this.personService.getPersons().subscribe(dato => {
      this.persons = dato;
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
    this.rol.rolNombre = "Medico";
    this.rol.idRol = 100;

    //this.newUser.persona = this.persona;
    this.newUser.estado = true;
    this.newUser.rol = this.rol;
    this.newUser.pin = "1344";
    /*
    this.doctorsService.crear(this.doctor).subscribe(response => {
      console.log(this.doctor)
      this.newUser.persona = this.doctor.persona;
      /*
      this.personService.createPerson(this.newUser).subscribe(res => {
        //this.doctor.persona = this.newUser.persona;

        //console.log("Doc Persona " + this.doctor.persona?.idPersona);
        if (response.id === undefined) {
          console.log('No definido ' + this.doctor.persona?.idPersona)
        } else {
          this.doctorsService.updateDoctor(response.id, this.doctor).subscribe(rest => {
            console.log("Actualizado");
          })

        }
      })

      /*////////// None
    /*this.personService.createPerson(this.newUser).subscribe(res => this.personId = res)

    this.persona.idPersona = this.personId
    this.doctor.persona = this.persona;

    console.log("Valor id persona " + this.doctor.persona)

    this.doctorsService.crear(this.doctor).subscribe( rest => {
      if(rest) {
        console.log("Actualizado");
      }
    })
    /*/
    //})
    this.doctor.persona = this.persona;
    this.getPersonById(this.persona.email);
    this.doctorsService.crear(this.doctor).subscribe(response => {
      console.log(this.doctor);  // Datos Aquí


      console.log(this.getPersonById(this.persona.email));

      if (this.doctor.persona !== undefined) {
        
        //this.usuario.persona = this.doctor.persona;
        this.usuario.persona = this.persona;
        this.usuarioService.createUser(this.usuario).subscribe(user => {
          console.log(user);
        })

      } else { 
        console.log('Indefinido');
      }

      /*
      this.personService.createPerson(this.newUser).subscribe(res => {
        // Se pierden aquí 

        console.log(this.newUser.persona);

        if (this.newUser.persona) {
          console.log("Doc Persona " + this.doctor.persona?.idPersona);
        } else {
          console.log('this.newUser.persona es indefinido');
        }

        if (response.id === undefined) {
          console.log('No definido');
        } else {
          this.doctorsService.updateDoctor(response.id, this.doctor).subscribe(rest => {
            console.log("Actualizado");
          });
        }
      });*/
    })
  }

  getPersonById(email: any) {
    this.personService.getPersonByEmail(email).subscribe(rest => {
        console.log(rest);
    });
  }
  

  /*
  
    public create(): void {
  
        //console.log(this.persona);
        //console.log(this.rol);
        //console.log(this.usuario);
        this.rol.rolNombre = "Medico";
        this.rol.idRol = 100;
        this.newUser.persona = this.persona;
        //this.doctor.persona = this.persona;
        this.newUser.estado = true;
        this.newUser.rol = this.rol;
        this.newUser.pin = "1344";
        //console.log(this.newUser);
        console.log(this.doctor);
  
        //    if (!this.validarCampos()) {
        this.personService.createPerson(this.newUser).pipe(
          tap((persona: any) => {
            // Create Doctor
            this.doctor.persona = this.newUser.persona; // Assign the created Persona to Doctor
            console.log("Person here " + persona);
  
            this.doctorsService.crear(this.doctor).pipe(
              tap(
                () => {
                  Swal.fire('Se registró con éxito').then(() => {
                    // Redirect the user to login after showing the message
                    this.router.navigate([this.routes.login]).then(() => {
                      window.location.reload();
                    });
                  });
                },
                (error: any) => {
                  console.error('Error creating Doctor', error);
                  // Handle the error appropriately
                }
              )
            ).subscribe();
          }),
        ).subscribe();
        // } else {
        // Manejar el caso en que el formulario no esté completo
        //Swal.fire('Verifique todos los campos');
        //}
        if(this.validarCampos()) {
        // Mostrar un mensaje de error o realizar otra acción
        return;
      }
    }*/

  /*
    public create(): void {
      this.rol.rolNombre = "Medico";
      this.rol.idRol = 100;
  
      //this.newUser.persona = this.persona;
      this.newUser.estado = true;
      this.newUser.rol = this.rol;
      this.newUser.pin = "1344";
  
      console.log(this.newUser);
  
      this.personService.createPerson(this.newUser).subscribe(
        async () => {
          try {
            await this.createDoctor();
          } catch (error) {
            console.error('Error creating Doctor', error);
            // Handle the error appropriately
          }
        },
        (error: any) => {
          console.error('Error creating Persona', error);
          // Handle the error appropriately
        }
      );
  
      if (this.validarCampos()) {
        // Mostrar un mensaje de error o realizar otra acción
        return;
      }
    }
  
    async createDoctor() {
      return new Promise<void>((resolve, reject) => {
  
        if (this.newUser && this.newUser.persona && this.doctor) {
          this.doctor.persona = this.doctor.persona||{};
          this.doctor.persona?.idPersona = this.newUser.persona.idPersona;
        } else {
          console.error('No se pudo realizar la asignación debido a valores indefinidos.');
        }
        
              if (this.newUser && this.newUser.persona && this.doctor && this.doctor.persona) {
        
              } else {
                this.doctor.persona.idPersona = this.newUser?.persona?.idPersona;
                console.log(this.doctor);
                this.doctorsService.crear(this.doctor).subscribe(
                  () => {
                    Swal.fire('Se registró con éxito').then(() => {
                      // Redirect the user to login after showing the message
                      this.router.navigate([this.routes.login]).then(() => {
                        window.location.reload();
                        resolve(); // Resolvemos la promesa si todo es exitoso
                      });
                    });
                  },
                  (error: any) => {
                    reject(error); // Rechazamos la promesa si hay un error
                  }
                );
              }
      });
    }
  /*
    async createDoctor() {
  
      // Inicializar
      this.doctor = {
        persona: {}  
      };
    
      return new Promise((resolve, reject) => {
    
        if (this.newUser && this.newUser.persona) {
    
          this.doctor.persona.idPersona = this.newUser.persona?.idPersona;
    
        } else {
          
          reject("Error: nuevo usuario no definido");
          return;
    
        }
    
        this.doctorsService.crear(this.doctor).subscribe(
          () => {     
              Swal.fire('Se registró con éxito').then(() => {
                  // Redirect the user to login after showing the message
                  this.router.navigate([this.routes.login]).then(() => {
                    window.location.reload();
                    resolve(); // Resolvemos la promesa si todo es exitoso
                  });
                });    
          },
    
          (error) => {
              reject(error);
          }
        );
    
      });
    
    }*/
  /*
    public create(): void {
      this.rol.rolNombre = "Medico";
      this.rol.idRol = 100;
  
      this.newUser.persona = this.persona;
      this.newUser.estado = true;
      this.newUser.rol = this.rol;
      this.newUser.pin = "1344";
  
      console.log(this.newUser);
  
      this.personService.createPerson(this.newUser).subscribe(
        async () => {
          try {
            await this.createDoctor();
          } catch (error) {
            console.error('Error creating Doctor', error);
            // Handle the error appropriately
          }
        },
        (error: any) => {
          console.error('Error creating Persona', error);
          // Handle the error appropriately
        }
      );
  
      if (this.validarCampos()) {
        // Mostrar un mensaje de error o realizar otra acción
        return;
      }
    }

  public create(): void {
    this.rol.rolNombre = "Medico";
    this.rol.idRol = 100;

    //this.newUser.persona = this.persona;
    this.newUser.estado = true;
    this.newUser.rol = this.rol;
    this.newUser.pin = "1344";

    this.doctorsService.crear(this.doctor).subscribe(response => {
      console.log(this.doctor)
      this.newUser.persona = this.doctor.persona;
      this.personService.createPerson(this.newUser).subscribe(res => {
        //this.doctor.persona = this.newUser.persona;
        
        console.log("Doc Persona " + this.doctor.persona?.idPersona);
        if (response.id === undefined) {
          console.log('No definido')
        } else {
          this.doctorsService.updateDoctor(response.id, this.doctor).subscribe(rest => {
            console.log("Actualizado");
          })

        }
      })
    }
    this.doctor.persona = this.persona;
    this.doctorsService.crear(this.doctor).subscribe(response => {
      console.log(this.doctor);  // Datos Aquí
    
      

      this.personService.createPerson(this.newUser).subscribe(res => {
        // Se pierden aquí 

        console.log(this.newUser.persona);

        if (this.newUser.persona) {
          console.log("Doc Persona " + this.doctor.persona?.idPersona);
        } else {
          console.log('this.newUser.persona es indefinido');
        }
    
        if (response.id === undefined) {
          console.log('No definido');
        } else {
          this.doctorsService.updateDoctor(response.id, this.doctor).subscribe(rest => {
            console.log("Actualizado");
          });
        }
      });
    }
    
        /*(newUserResponse: number) => {
          console.log('Usuario creado:', newUserResponse);
    
          try {
            const  personaGuardada = newUserResponse;
            console.log('Persona recuperada:', personaGuardada);
    
            if (personaGuardada != undefined) {
              //this.doctor.persona.idPersona = personaGuardada;
              console.log('Doctor actualizado con la persona:', this.doctor);
    
              this.createDoctor().then(() => {
                // Resto del código...
              }).catch((error: any) => {
                console.error('Error creating Doctor', error);
                // Handle the error appropriately
              });
            } else {
              console.error('Error: La persona devuelta es indefinida.');
            }
          } catch (error) {
            console.error('Error creating Doctor', error);
            // Handle the error appropriately
          }
        },
      (error: any) => {
        console.error('Error creating Persona', error);
        // Handle the error appropriately
      }
    );

    if (this.validarCampos()) {
      // Mostrar un mensaje de error o realizar otra acción
      return;
    }
  }
/*
  public create(): void {
    this.rol.rolNombre = "Medico";
    this.rol.idRol = 100;
  
    this.newUser.persona = this.persona;
    this.newUser.estado = true;
    this.newUser.rol = this.rol;
    this.newUser.pin = "1344";
  
    this.doctorsService.crear(this.doctor).subscribe(response => {
      console.log(this.doctor);
  
      this.personService.createPerson(this.newUser).subscribe(res => {
        if (this.newUser.persona) {
          this.doctor.persona = this.newUser.persona;
          console.log("Doc Persona " + this.doctor.persona?.idPersona);
        } else {
          console.log('this.newUser.persona es indefinido');
        }
  
        if (response.id === undefined) {
          console.log('No definido');
        } else {
          this.doctorsService.updateDoctor(response.id, this.doctor).subscribe(rest => {
            console.log("Doctor actualizado");
            
            // Resto del código que deseas ejecutar después de la actualización del médico
          });
        }
      });
    },
    (error: any) => {
      console.error('Error creating Doctor', error);
      // Handle the error appropriately
    });
  
    if (this.validarCampos()) {
      // Mostrar un mensaje de error o realizar otra acción
      return;
    }
  }
*/
  validarCampos(): boolean {
    let camposInvalidos = false;

    if (!this.persona.telefono) {
      this.errores.telefono = 'Ingrese un número de telefono';
      camposInvalidos = true;
    } else {
      const telefonoExistente = this.persons.some(p => p.telefono === this.persona.telefono);
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
      const cedulaExistente = this.persons.some(p => p.documento === this.persona.documento);
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

    const primerNombreInput = this.persona.primerNombre;
    if (primerNombreInput != null) {
      if (/\d/.test(primerNombreInput)) {
        this.errores.nombre = 'Ingrese un nombre';
        camposInvalidos = true;
      } else {
        this.errores.nombre = '';
      }
    } else {
      this.errores.nombre = 'Campo obligatorio';
      camposInvalidos = true;
    }

    const segundoNombreInput = this.persona.segundoNombre;
    if (segundoNombreInput != null) {
      if (/\d/.test(segundoNombreInput)) {
        this.errores.nombre = 'Ingrese un nombre';
        camposInvalidos = true;
      } else {
        this.errores.nombre = '';
      }
    } else {
      this.errores.nombre = 'El nombre y apellido son obligatorios';
      camposInvalidos = true;
    }

    const primerApellidoInput = this.persona.primerApellido;
    if (primerApellidoInput != null) {
      if (/\d/.test(primerApellidoInput)) {
        this.errores.nombre = 'Ingrese un apellido válido';
        camposInvalidos = true;
      } else {
        this.errores.nombre = '';
      }
    } else {
      this.errores.nombre = 'El apellido es obligatorio';
      camposInvalidos = true;
    }

    const segundoApellidoInput = this.persona.segundoApellido;
    if (segundoApellidoInput != null) {
      if (/\d/.test(segundoApellidoInput)) {
        this.errores.nombre = 'Ingrese apellido válido';
        camposInvalidos = true;
      } else {
        this.errores.nombre = '';
      }
    } else {
      this.errores.nombre = 'El apellido es obligatorio';
      camposInvalidos = true;
    }

    const emailInput = this.persona.email;
    if (emailInput != null) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput)) {
        this.errores.email = 'Ingrese una dirección de correo electrónico válida';
        camposInvalidos = true;
      } else {
        const emailExistente = this.persons.some(p => p.email === this.persona.email);
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

    if (!this.persona.direccion) {
      this.errores.direccion = 'Ingrese una dirección';
      camposInvalidos = true;
    } else {
      this.errores.direccion = '';
    }

    const claveInput = this.newUser.password;
    const claveRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (claveInput != null) {
      if (!claveRegex.test(claveInput)) {
        this.errores.clavesecreta = 'Ingrese un clave válida (8 caracteres mínimo - Al menos una letra en mayúscula y minúscula y un número)';
        camposInvalidos = true;
      } else if (this.newUser.password !== this.repetirClave) {
        this.errores.claveDiferente = 'Las contraseñas no coinciden';
        camposInvalidos = true;
      } else {
        this.errores.claveDiferente = '';
      }
    } else {
      this.errores.clavesecreta = 'La clave es obligatoria';
      camposInvalidos = true;
    }

    const pinInput = this.newUser.pin;
    if (pinInput != null) {
      if (this.newUser.pin !== this.repetirPIN) {
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
