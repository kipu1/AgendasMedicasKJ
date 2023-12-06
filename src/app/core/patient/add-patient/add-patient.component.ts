import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { Paciente } from '../paciente';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { patientService } from '../patient.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
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
  validador: boolean = false;
  // identificacion: String;
  //change components
  bCompntNew:boolean =true;
  bCompntAntece:boolean=false;
  bCompntClinc:boolean=false;
  bCompontGmail:boolean=false;
  showModalWhatsapp: boolean = false;

  constructor(private auth: AuthService, private personaServicio: patientService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.obtenerpersona();
   

  }

  obtenerpersona() {
    this.personaServicio.obtenerListaPersona().subscribe(dato => {
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
      const formData = new FormData();
      formData.append('file', file);

      this.personaServicio.subirImagen(formData).subscribe(
        (response: any) => {
          const imageUrl = response.url;
          this.paciente.foto = imageUrl;
        },
        (error: any) => {
          console.error('Error al subir la imagen', error);
        }
      );
    }
  }

  // Método para obtener la URL segura (trusted) para la imagen
  obtenerUrlSegura(url: string): any {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  
  
  
  changeInterface(interfaceSelec: string){
    switch (interfaceSelec) {
      case "new":
        this.bCompntNew=true;
        this.bCompntAntece=false;
        this.bCompntClinc=false;
        this.bCompontGmail=false;
        break;
      case "antecedentes":
        this.bCompntNew=false;
        this.bCompntAntece=true;
        this.bCompntClinc=false;
        this.bCompontGmail=false;
        break;
      case "clinico":
        this.bCompntNew=false;
        this.bCompntAntece=false;
        this.bCompntClinc=true;
        this.bCompontGmail=false;
        break
      case "gmail":
        this.bCompntNew=false;
        this.bCompntAntece=false;
        this.bCompntClinc=false;
        this.bCompontGmail=true;
        break;
      default:
        break;
    }
  }

  guardarPersona() {
    console.log(this.paciente); // Verificar los valores de los campos
    var apellido = this.paciente.apellido;
    var nombre = this.paciente.nombre;
    var tipodocumento = this.paciente.tipodocumento;
    var documento = this.paciente.documento;
    var civil = this.paciente.civil;
    var fechanacimiento = this.paciente.fechanacimiento;
    var direccion = this.paciente.direccion;
    var telefono = this.paciente.grupo;
    var sexo = this.paciente.sexo;
    var direccion = this.paciente.direccion;

    var cp = this.paciente.cp;
    var direccion = this.paciente.direccion;
    var obra = this.paciente.obra;
    var afiliado = this.paciente.afiliado;
    var telefono1 = this.paciente.telefono1;
    var telefono2 = this.paciente.telefono2;
    var telefono3 = this.paciente.telefono3;

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





    // Código para guardar la persona
    this.personaServicio.registrarPersona(this.paciente).subscribe(dato => {
      this.obtenerpersona();
    }, error => {

      console.log(error);
      alert('La persona ha sido guardada correctamente');

      // Llamada al método para obtener la lista de personas después de guardar una nueva persona
    },

    );

    this.paciente.apellido = '';
    this.paciente.nombre = '';
    this.paciente.tipodocumento = '';
    this.paciente.documento = '';
    this.paciente.civil = '';
    this.paciente.fechanacimiento = '';
    this.paciente.direccion = '';
    this.paciente.grupo = '';
    this.paciente.sexo = '';
    this.paciente.direccion = '';

    this.paciente.cp = '';
    this.paciente.direccion = '';
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

  onSubmit() {
    this.guardarPersona();
  }
}
