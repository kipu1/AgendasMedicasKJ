import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { Paciente } from '../../../authentication/register/Models/paciente';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/shared/auth/auth.service';

import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { patientService } from '../../services/patient.service';
import { persona } from 'src/app/authentication/register/Models/persona';
import { PersonaService } from '../../services/persona.service';
interface data {
  value: string;
}
@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']

})
export class AddPatientComponent {

  public routes = routes;
  paciente: Paciente = new Paciente();
  pacientes: Paciente[] = [];
  person: persona = new persona();
  personsList: persona[] = [];
  validador: boolean = false;
  // identificacion: String;
  //change components
  bCompntNew: boolean = true;
  bCompntAntece: boolean = false;
  bCompntClinc: boolean = false;
  bCompontGmail: boolean = false;
  showModalWhatsapp: boolean = false;
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
  constructor(private auth: AuthService,
    private patientServicio: patientService,
    private personService: PersonaService,
    private router: Router,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    //this.obtenerpersona();
    this.getPersonsPatient();
  }

  getPersonsPatient(): void {
    this.personService.getPersons().subscribe(persons => {
      this.personsList = persons;
      console.log(this.personsList);
    });
  }

  obtenerpersona() {
    this.patientServicio.obtenerListaPersona().subscribe(dato => {
      this.pacientes = dato;
    });
  }
  public redirectMessage(phoneNumber: string): void {
    // Reemplaza el "0" al principio del número con "593"
    const formattedPhoneNumber: string = phoneNumber.replace(/^0/, '593');

    const encodedMessage: string = encodeURIComponent("Hola cual es tu consulta?");
    const whatsappURL: string = `https://api.whatsapp.com/send?phone=${formattedPhoneNumber}&text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
    this.showModalWhatsapp = false;
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.patientServicio.subirOActualizarFoto(null, file).subscribe(
        (response: any) => {
          const imageUrl = response.url;
          this.person.foto = imageUrl;
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

  changeInterface(interfaceSelec: string) {
    switch (interfaceSelec) {
      case "new":
        this.bCompntNew = true;
        this.bCompntAntece = false;
        this.bCompntClinc = false;
        this.bCompontGmail = false;
        break;
      case "antecedentes":
        this.bCompntNew = false;
        this.bCompntAntece = true;
        this.bCompntClinc = false;
        this.bCompontGmail = false;
        break;
      case "clinico":
        this.bCompntNew = false;
        this.bCompntAntece = false;
        this.bCompntClinc = true;
        this.bCompontGmail = false;
        break;
      case "gmail":
        this.bCompntNew = false;
        this.bCompntAntece = false;
        this.bCompntClinc = false;
        this.bCompontGmail = true;
        break;
      default:
        break;
    }
  }

  guardarPersona() {
    if (this.validarCampos()) {
      // Mostrar un mensaje de error o realizar otra acción
      return;
    }
    console.log(this.paciente); // Verificar los valores de los campos
    var apellido = this.person.primerApellido;
    var nombre = this.person.primerNombre;
    var tipodocumento = this.person.tipoDocumento;
    var documento = this.person.documento;
    var civil = this.person.estadoCivil;
    var fechanacimiento = this.person.fechanacimiento;
    var direccion = this.person.direccion;
    var telefono = this.person.telefono;
    var sexo = this.person.genero;
    var fotos = this.person.foto;
    var email = this.person.email;
    var obra = this.paciente.obra;
    var afiliado = this.paciente.afiliado;
    //var telefono1 = this.paciente.telefono1;
    //var telefono2 = this.paciente.telefono2;
    //var telefono3 = this.paciente.telefono3;

    var campoCfg1 = this.paciente.campoCfg1;
    var campoCfg2 = this.paciente.campoCfg2;

    var campoCfg3 = this.paciente.campoCfg3;
    var clinicos = this.paciente.clinicos;

    var familiar = this.paciente.familiar;
    var diagnostico = this.paciente.diagnostico;
    var cormobilidades = this.paciente.cormobilidades;
    var extra1 = this.paciente.extra1;
    var extra2 = this.paciente.extra2;

    var extra3 = this.paciente.extra3;
    var extra4 = this.paciente.extra4;

    var extra5 = this.paciente.extra5;
    var extra6 = this.paciente.extra6;

    var extra7 = this.paciente.extra7;
    var extra8 = this.paciente.extra8
    var extra9 = this.paciente.extra9;
    var extra10 = this.paciente.extra10;

    var comentarios = this.paciente.comentarios;

    this.personService.createPersonByObject(this.person).subscribe(personResponse => {
      //this.obtenerpersona();
      console.log(personResponse);
      this.patientServicio.createPatient(this.paciente).subscribe(patientResponse => {
        console.log(patientResponse);
        /*this.router.navigate([this.routes.patientsList]).then(() => {
          window.location.reload();
        });*/
      });
    }, error => {

      console.log(error);
      // alert('La persona ha sido guardada correctamente');

      // Llamada al método para obtener la lista de personas después de guardar una nueva persona
    },
    );
    //Revisar a razón a de ver cambios en el mapping de Pacientes - Personas
   
    this.paciente.obra = '';
    this.paciente.afiliado = '';
    this.paciente.telefono1 = '';
    this.paciente.telefono2 = '';
    this.paciente.telefono3 = '';
    this.paciente.campoCfg1 = '';
    this.paciente.campoCfg2 = '';
    this.paciente.campoCfg3 = '';
    this.paciente.clinicos = '';
    this.paciente.familiar = '';
    this.paciente.diagnostico = '';
    this.paciente.cormobilidades = '';
    this.paciente.extra1 = '';
    this.paciente.extra2 = '';
    this.paciente.extra3 = '';
    this.paciente.extra4 = '';
    this.paciente.extra5 = '';
    this.paciente.extra6 = '';
    this.paciente.extra7 = '';
    this.paciente.extra8 = '';
    this.paciente.extra9 = '';
    this.paciente.extra10 = '';
    this.paciente.comentarios = '';
  }

  // descargarArchivo(filename: string): void {
  //     this.pacienteService.descargarArchivo(filename).subscribe((response) => {
  //       const blob = new Blob([response.body], { type: response.headers.get('Content-Type') || 'application/octet-stream' });
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       document.body.appendChild(a);
  //       a.href = url;
  //       a.download = filename;
  //       a.click();
  //       window.URL.revokeObjectURL(url);
  //     });
  //   }

  validarCampos(): boolean {
    let camposInvalidos = false;

    if (!this.person.primerApellido) {
      this.errores.apellido = 'Por favor, ingrese el apellido';
      camposInvalidos = true;
    } else {
      this.errores.apellido = '';
    }

    if (!this.person.primerNombre) {
      this.errores.nombre = 'Por favor, ingrese el nombre';
      camposInvalidos = true;
    } else {
      this.errores.nombre = '';
    }

    if (!this.person.estadoCivil) {
      this.errores.civil = 'Por favor, seleccione un estado civil';
      camposInvalidos = true;
    } else {
      this.errores.civil = '';
    }
    if (!this.person.tipoDocumento) {
      this.errores.tipodocumento = 'Por favor, seleccione el tipo de documento';
      camposInvalidos = true;
    } else {
      this.errores.tipodocumento = '';
    }

    if (!this.person.documento) {
      this.errores.documento = 'Por favor, ingrese el número de documento';
      camposInvalidos = true;
    } else {
      // Verificar si la cédula ya está registrada - Revisar 
      /*
      const cedulaExistente = this.pacientes.some(p => p.documento === this.paciente.documento);
      if (cedulaExistente) {
        this.errores.documento = 'El número de documento ya está registrado';
        camposInvalidos = true;
      } else {
        this.errores.documento = '';
      }*/
    }

    if (!this.person.fechanacimiento) {
      this.errores.fechanacimiento = 'Por favor, seleccione la fecha de nacimiento';
      camposInvalidos = true;
    } else {
      /*if (this.fechaValidator()) {
        this.errores.fechanacimiento = 'Por favor, ingrese una fecha de nacimiento válida';
        camposInvalidos = true;
      } else {
        this.errores.fechanacimiento = '';
      }*/
    }

    //New Validations
    if (!this.person.grupoSanguineo) {
      this.errores.grupo = 'Por favor, seleccione un grupo sanguíneo';
      camposInvalidos = true;
    } else {
      this.errores.grupo = '';
    }

    if (!this.person.genero) {
      this.errores.sexo = 'Por favor, seleccione el sexo del paciente';
      camposInvalidos = true;
    } else {
      this.errores.sexo = '';
    }

    if (!this.person.direccion) {
      this.errores.direccion = 'Por favor, ingrese la dirección';
      camposInvalidos = true;
    } else {
      this.errores.direccion = '';
    }

    if (!this.person.email) {
      this.errores.email = 'Por favor, ingrese una dirección de correo electrónico';
      camposInvalidos = true;
    } else {
      this.errores.email = '';
    }

    if (!this.person.telefono) {
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

  /*  Verificar por qué la función no valida correctamente - Deja pasar fechas no válidas
  fechaValidator(): boolean {
    const fechaNacimiento = new Date(this.paciente.fechanacimiento as string);
    const todayDate = new Date();
    const edad = todayDate.getFullYear() - fechaNacimiento.getFullYear();
    console.log(fechaNacimiento);
    return (edad > 100 || edad < 0);
  }*/

  verificarCedulaExistente() {
    // Realiza la llamada al servicio para verificar si la cédula ya está registrada
    this.personService.getPersonById(this.person.idPersona).subscribe(
      (respuesta: any) => {
        if (respuesta.existe) {
          this.errores.documento = 'El número de cédula ya está registrado.';
        }
      },
      (error: any) => {
        console.error('Error al verificar la cédula:', error);
      }
    );
  }

  onSubmit() {
    if (!this.validarCampos()) {
      // Si la validación falla, no continuar con el envío
      return;
    }
    // Resto del código para guardar el paciente
    this.guardarPersona();
  }

}
