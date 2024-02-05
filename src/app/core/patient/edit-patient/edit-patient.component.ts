import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { routes } from 'src/app/shared/routes/routes';

import { Paciente } from '../../../authentication/register/Models/paciente';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { patientService } from '../../services/patient.service';
import { DomSanitizer } from '@angular/platform-browser';
interface data {
  value: string;
}
@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent {
  /*
  public routes = routes;
  id!: number;
  paciente: Paciente = new Paciente();
  pacientes: Paciente[] = [];
  validador: boolean = false;
  showModalWhatsapp: boolean = false;

  // identificacion: String;
  pacienteActualizado = new Paciente();
  constructor(private auth: AuthService, private pacienteService: patientService, private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.obtenerpersona(); // Actualizar la lista después de la actualización
      this.pacienteService.Buscarid(this.id).subscribe(
        response => {
          this.paciente = response
          // Asigna los datos del paciente al modelo
        });
      // Ahora puedes usar el ID como desees en tu componente
    })

    this.obtenerpersona(); // Actualizar la lista después de la actualización
    // Restablecer los valores del objeto this.paciente
  }

  errores = {
    apellido: '',
    nombre: '',
    documento: '',
    civil: '',
    tipodocumento: '',
    fechanacimiento: '',
    grupo: '',
    sexo: '',
    direccion: '',
    email: '',
    telefono: '',
  };

  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.pacienteService.subirOActualizarFoto(null, file).subscribe(
        (response: any) => {
          const imageUrl = response.url;
          this.paciente.foto = imageUrl;
        },
        (error: any) => {
          console.error('Error al subir o actualizar la imagen', error);
        }
      );
    }
  }


  // Método para obtener la URL segura (trusted) para la imagen
  obtenerUrlSegura(url: string): any {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  public redirectMessage(phoneNumber: string): void {
    // Reemplaza el "0" al principio del número con "593"
    const formattedPhoneNumber: string = phoneNumber.replace(/^0/, '593');

    const encodedMessage: string = encodeURIComponent("Hola cual es tu consulta?");
    const whatsappURL: string = `https://api.whatsapp.com/send?phone=${formattedPhoneNumber}&text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
    this.showModalWhatsapp = false;
  }

  obtenerpersona() {
    this.pacienteService.obtenerListaPersona().subscribe(dato => {
      this.pacientes = dato;
    });
  }

  actualizarDatos(idPaciente: number): void {
    console.log('Datos actualizados:', idPaciente);
    const nuevoApellido = this.paciente.apellido;
    const nuevonombre = this.paciente.nombre;
    const nuevoTipoDocumento = this.paciente.tipodocumento;


    const nuevoDocumento = this.paciente.documento;
    const nuevafecha = this.paciente.fechanacimiento;
    const nuevoGrupo = this.paciente.grupo;
    const nuevosexo = this.paciente.sexo;
    const nuevadireccion = this.paciente.direccion;
    const nuevaobra = this.paciente.obra;
    const nuevocorreo = this.paciente.cp;
    const ntelefono1 = this.paciente.telefono1;
    const ntelefono2 = this.paciente.telefono2;
    const ntelefono3 = this.paciente.telefono3;
    const nclinico = this.paciente.clinicos;
    const nfamiliar = this.paciente.familiar;
    const ndiagnostico = this.paciente.diagnostico;
    const ncomormobilidades = this.paciente.cormobilidades;
    const ncomentarios = this.paciente.comentarios;
    const nuevoafiliado = this.paciente.afiliado;
    const ncivil = this.paciente.civil;
    const nextra1 = this.paciente.extra1;
    const nextra2 = this.paciente.extra2;
    const nextra3 = this.paciente.extra3;
    const nextra4 = this.paciente.extra4;
    const nextra5 = this.paciente.extra5;
    const nextra6 = this.paciente.extra6;
    const nextra7 = this.paciente.extra7;
    const nextra8 = this.paciente.extra8;
    const nextra9 = this.paciente.extra9;
    const nextra10 = this.paciente.extra10;
    const ncamp1 = this.paciente.campoCfg1;
    const ncamp2 = this.paciente.campoCfg2;
    const ncamp3 = this.paciente.campoCfg3;
    const foto = this.paciente.foto;
    // const nuevoSexo = this.paciente.sexo;
    // Crear un objeto 'pacienteActualizado' con los valores actualizados
    this.pacienteActualizado.apellido = nuevoApellido;
    this.pacienteActualizado.nombre = nuevonombre;
    this.pacienteActualizado.documento = nuevoDocumento;
    this.pacienteActualizado.tipodocumento = nuevoTipoDocumento;
    this.pacienteActualizado.fechanacimiento = nuevafecha;
    this.pacienteActualizado.sexo = nuevosexo;
    this.pacienteActualizado.grupo = nuevoGrupo;
    this.pacienteActualizado.afiliado = nuevoafiliado;
    this.pacienteActualizado.cp = nuevocorreo;
    this.pacienteActualizado.direccion = nuevadireccion;
    this.pacienteActualizado.obra = nuevaobra;
    this.pacienteActualizado.telefono1 = ntelefono1;
    this.pacienteActualizado.telefono2 = ntelefono2;
    this.pacienteActualizado.telefono3 = ntelefono3;
    this.pacienteActualizado.familiar = nfamiliar;
    this.pacienteActualizado.clinicos = nclinico;
    this.pacienteActualizado.diagnostico = ndiagnostico;
    this.pacienteActualizado.cormobilidades = ncomormobilidades;
    this.pacienteActualizado.comentarios = ncomentarios;
    this.pacienteActualizado.civil = ncivil;
    this.pacienteActualizado.extra1 = nextra1;
    this.pacienteActualizado.extra2 = nextra2;
    this.pacienteActualizado.extra3 = nextra3;
    this.pacienteActualizado.extra4 = nextra4;
    this.pacienteActualizado.extra5 = nextra5;
    this.pacienteActualizado.extra6 = nextra6;
    this.pacienteActualizado.extra7 = nextra7;
    this.pacienteActualizado.extra8 = nextra8;
    this.pacienteActualizado.extra9 = nextra9;
    this.pacienteActualizado.extra10 = nextra10;
    this.pacienteActualizado.campoCfg1 = ncamp1;
    this.pacienteActualizado.campoCfg2 = ncamp2;
    this.pacienteActualizado.campoCfg3 = ncamp3;
    this.pacienteActualizado.foto = foto;

    this.router.navigate([this.routes.patientsList]).then(() => {
      window.location.reload();
    });
    // Llamar al método actualizarPersona() del servicio para enviar los datos actualizados al servidor
    this.pacienteService.actualizarPersona(this.id, this.pacienteActualizado).subscribe(
      response => {
        console.log('Datos actualizados:', this.pacienteActualizado);
        // Realizar cualquier otra lógica necesaria después de la actualización exitosa
      },
      error => {
        console.error('Error al actualizar los datos:', error);
        // Manejar el error de alguna manera apropiada en tu aplicación
      }
    );
  }

  validarCampos(): boolean {
    let camposInvalidos = false;

    if (!this.paciente.apellido.trim()) {
      this.errores.apellido = 'Por favor, ingrese el apellido';
      camposInvalidos = true;
    } else {
      this.errores.apellido = '';
    }

    if (!this.paciente.nombre) {
      this.errores.nombre = 'Por favor, ingrese el nombre';
      camposInvalidos = true;
    } else {
      this.errores.nombre = '';
    }

    if (!this.paciente.civil) {
      this.errores.civil = 'Por favor, seleccione un estado civil';
      camposInvalidos = true;
    } else {
      this.errores.civil = '';
    }
    if (!this.paciente.tipodocumento) {
      this.errores.tipodocumento = 'Por favor, seleccione el tipo de documento';
      camposInvalidos = true;
    } else {
      this.errores.tipodocumento = '';
    }

    if (!this.paciente.documento) {
      this.errores.documento = 'Por favor, ingrese el número de documento';
      camposInvalidos = true;
    } else {
      // Verificar si la cédula ya está registrada
      const cedulaExistente = this.pacientes.some(p => p.documento === this.paciente.documento);
      if (cedulaExistente) {
        this.errores.documento = 'El número de documento ya está registrado';
        camposInvalidos = true;
      } else {
        this.errores.documento = '';
      }
    }

    if (!this.paciente.fechanacimiento) {
      this.errores.fechanacimiento = 'Por favor, seleccione la fecha de nacimiento';
      camposInvalidos = true;
    } else {
      if (this.fechaValidator()) {
        this.errores.fechanacimiento = 'Por favor, ingrese una fecha de nacimiento válida';
        camposInvalidos = true;
      } else {
        this.errores.fechanacimiento = '';
      }
    }

    //New Validations
    if (!this.paciente.grupo) {
      this.errores.grupo = 'Por favor, seleccione un grupo sanguíneo';
      camposInvalidos = true;
    } else {
      this.errores.grupo = '';
    }

    if (!this.paciente.sexo) {
      this.errores.sexo = 'Por favor, seleccione el sexo del paciente';
      camposInvalidos = true;
    } else {
      this.errores.sexo = '';
    }

    if (!this.paciente.direccion) {
      this.errores.direccion = 'Por favor, ingrese la dirección';
      camposInvalidos = true;
    } else {
      this.errores.direccion = '';
    }

    if (!this.paciente.cp) {
      this.errores.email = 'Por favor, ingrese una dirección de correo electrónico';
      camposInvalidos = true;
    } else {
      this.errores.email = '';
    }

    if (!this.paciente.telefono1) {
      this.errores.telefono = 'Por favor, ingrese un número telefónico';
      camposInvalidos = true;
    } else {
      this.errores.telefono = '';
    }

    return camposInvalidos;
  }
  limpiarErrores(campo: string): void {
    if (campo === 'apellido') {
      this.errores.apellido = '';
    } else if (campo === 'nombre') {
      this.errores.nombre = '';
    } else if (campo === 'documento') {
      this.errores.documento = '';
    } else if (campo === 'civil') {
      this.errores.civil = '';
    } else if (campo === 'tipodocumento') {
      this.errores.tipodocumento = '';
    } else if (campo === 'fechanacimiento') {
      this.errores.fechanacimiento = '';
    }
  }

  fechaValidator(): boolean {
    const fechaNacimiento = new Date(this.paciente.fechanacimiento as string);
    const todayDate = new Date();
    const edad = todayDate.getFullYear() - fechaNacimiento.getFullYear();
    console.log(fechaNacimiento);
    return (edad > 100 || edad < 0);
  }*/
}
