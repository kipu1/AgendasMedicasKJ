import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { routes } from 'src/app/shared/routes/routes';
import { Paciente } from '../../patient/paciente';
import { patientService } from '../../services/patient.service';


@Component({
  selector: 'app-email-settings',
  templateUrl: './email-settings.component.html',
  styleUrls: ['./email-settings.component.scss']
})
export class EmailSettingsComponent {
  public routes = routes;
  paciente: Paciente = new Paciente();
  pacientes: Paciente[] = [];
  validador: boolean = false;
  // identificacion: String;

  constructor(private auth: AuthService, private personaServicio: patientService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerpersona();

  }

  obtenerpersona() {
    this.personaServicio.obtenerListaPersona().subscribe(dato => {
      this.pacientes = dato;
    });
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



  onSubmit() {
    this.guardarPersona();
  }
}
