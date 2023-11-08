import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { Paciente } from '../paciente';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { patientService } from '../patient.service';
import { Router } from '@angular/router';
interface data {
  value: string ;
}
@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
  
})
export class AddPatientComponent {
 
  public routes = routes;
  paciente:Paciente = new Paciente();
  pacientes: Paciente[] = [];
  validador: boolean = false;
  // identificacion: String;
 
  constructor(private auth:AuthService, private personaServicio:patientService,private router:Router) { }

  ngOnInit(): void {
    this.obtenerpersona();
   
  }
  
  obtenerpersona(){
    this.personaServicio.obtenerListaPersona().subscribe(dato => {
      this.pacientes = dato;
    });
  }
 
  validadorDeCedula(identificacion: String): boolean {
    let cedulaCorrecta = false;
    
    if (identificacion.length == 10)
    {    
        let tercerDigito = parseInt(identificacion.substring(2, 3));
        if (tercerDigito < 6) {
        
            // El ultimo digito se lo considera dígito verificador
            let coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];       
            let verificador = parseInt(identificacion.substring(9, 10));
            let suma:number = 0;
            let digito:number = 0;
            for (let i = 0; i < (identificacion.length - 1); i++) {
                digito = parseInt(identificacion.substring(i, i + 1)) * coefValCedula[i];      
                suma += ((parseInt((digito % 10)+'') + (parseInt((digito / 10)+''))));
          //      console.log(suma+" suma"+coefValCedula[i]); 
            }
            
            suma= Math.round(suma);
          
          //  console.log(verificador);
          //  console.log(suma);
          //  console.log(digito);
  
            if ((Math.round(suma % 10) == 0) && (Math.round(suma % 10)== verificador)) {
                cedulaCorrecta = true;
            } else if ((10 - (Math.round(suma % 10))) == verificador) {
                cedulaCorrecta = true;
            } else {
                cedulaCorrecta = false;
            }
        } else {
            cedulaCorrecta = false;
        }
    } else {
        cedulaCorrecta = false;
    }
  
  
  this.validador= cedulaCorrecta;
  return cedulaCorrecta;
    
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
    this.personaServicio.guardarPersona(this.paciente).subscribe(
      () => {
        alert('La persona ha sido guardada correctamente');
        this.obtenerpersona(); // Llamada al método para obtener la lista de personas después de guardar una nueva persona
      },
    
    );
   
    this.personaServicio.registrarPersona(this.paciente).subscribe(dato => {
      console.log(dato);
     
      this.irAlalistaDePersona();
    }, error => {
      console.log(error);
    });
    
   
    this.paciente.apellido= '';
    this.paciente.nombre= '';
    this.paciente.tipodocumento= '';
   this.paciente.documento= '';
  this.paciente.civil= '';
   this.paciente.fechanacimiento= '';
    this.paciente.direccion= '';
    this.paciente.grupo= '';
   this.paciente.sexo= '';
 this.paciente.direccion= '';
  
    this.paciente.cp= '';
    this.paciente.direccion= '';
    this.paciente.obra= '';
 this.paciente.afiliado= '';
   this.paciente.telefono1= '';
     this.paciente.telefono2= '';
   this.paciente.telefono3= '';
  
   this.paciente.campoCfg1= '';
     this.paciente.campoCfg2= '';
  
     this.paciente.campoCfg3= '';
     this.paciente.clinicos= '';
  
   this.paciente.familiar= '';
   this.paciente.diagnostico= '';
     this.paciente.cormobilidades= '';
   this.paciente.extra1= '';
   this.paciente.extra2= '';
  
    this.paciente.extra3= '';
    this.paciente.extra4= '';
  
 this.paciente.extra5= '';
  this.paciente.extra6= '';
  
    this.paciente.extra7= '';
   this.paciente.extra8= '';
   this.paciente.extra9= '';
 this.paciente.extra10= '';
  
   this.paciente.comentarios= '';
  
   
  }
 
  
irAlalistaDePersona(){
  this.router.navigate(['/patients-list'])
}

  onSubmit(){
    this.guardarPersona();
  }
}
