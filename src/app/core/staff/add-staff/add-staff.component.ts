import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { AntropometriaService } from '../antropometria.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Antropometria } from '../antropometria';
import { Router } from '@angular/router';
interface data {
  value: string ;
}
@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent {
  public routes = routes;

  antropometria: Antropometria = new Antropometria();
  pacientes: Antropometria[] = [];
  validador: boolean = false;
  // identificacion: String;
  bCompntinicial:boolean =true;
  bCompntpliegue:boolean=false;
  bCompntdiame:boolean=false;
  bCompontperimetros:boolean=false;
  bCompontlongitudes:boolean=false;
  
  constructor(private auth: AuthService, private antropometriaServicio: AntropometriaService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerpersona();

  }

  obtenerpersona() {
    this.antropometriaServicio.obtenerListaPersona().subscribe(dato => {
      this.pacientes = dato;
    });
  }

  changeInterface(interfaceSelec: string){
    switch (interfaceSelec) {
      case "inicial":
        this.bCompntinicial=true;
        this.bCompntpliegue=false;
        this.bCompntdiame=false;
        this.bCompontperimetros=false;
        this.bCompontlongitudes=false;
        break;
      case "pliegue":
        this.bCompntinicial=false;
        this.bCompntpliegue=true;
        this.bCompntdiame=false;
        this.bCompontperimetros=false;
        this.bCompontlongitudes=false;
        break;
      case "Diametros":
        this.bCompntinicial=false;
        this.bCompntpliegue=false;
        this.bCompntdiame=true;
        this.bCompontperimetros=false;
        this.bCompontlongitudes=false;
        break
        case "Perimetros":
          this.bCompntinicial=false;
          this.bCompntpliegue=false;
          this.bCompntdiame=false;
          this.bCompontperimetros=true;
          this.bCompontlongitudes=false;
          break
      case "Longuitudes":
        this.bCompntinicial=false;
        this.bCompntpliegue=false;
        this.bCompntdiame=false;
        this.bCompontperimetros=false;
        this.bCompontlongitudes=true;
        break;
      default:
        break;
    }
  }

  guardarPersona() {
    console.log(this.antropometria); // Verificar los valores de los campos
    var apellido = this.antropometria.fecha;
    var nombre = this.antropometria.edad;
    var tipodocumento = this.antropometria.peso;
    var documento = this.antropometria.talla;
    var civil = this.antropometria.tronco;
    var fechanacimiento = this.antropometria.dsuspino;
    var direccion = this.antropometria.envergadura;
    var telefono = this.antropometria.bicipital;
    var sexo = this.antropometria.ileocristal;
    var direccion = this.antropometria.supraespinal;

    var cp = this.antropometria.axilar;
    var direccion = this.antropometria.abdominal;
    var obra = this.antropometria.tricipital;
    var afiliado = this.antropometria.subescapular;
    var telefono1 = this.antropometria.pectoral;
    var telefono2 = this.antropometria.gemelo;
    var telefono3 = this.antropometria.muslofrontal;

    var campoCfg1 = this.antropometria.humeral;
    var campoCfg2 = this.antropometria.femoral;

    var campoCfg3 = this.antropometria.biacromial;
    var clinicos = this.antropometria.biileocretideo;

    var familiar = this.antropometria.toraxap;
    var diagnostico = this.antropometria.muslo;
    var cormobilidades = this.antropometria.tobillo;
    var extra1 = this.antropometria.biliacodi;
    var extra2 = this.antropometria.muneca;

    var extra3 = this.antropometria.toraxtrans;
    var extra4 = this.antropometria.cefalico;

    var extra5 = this.antropometria.torax;
    var extra6 = this.antropometria.antebrazo;

    var extra7 = this.antropometria.tobillo1;
    var extra8 = this.antropometria.cintura
    var extra9 = this.antropometria.cuello;
    var extra10 = this.antropometria.bicipitalrel;

    var comentarios = this.antropometria.bicitalflex;
    var familiar = this.antropometria.muslo1;
    var diagnostico = this.antropometria.cadera;
    var cormobilidades = this.antropometria.muneca1;
    var extra1 = this.antropometria.gemelo1;
    var extra2 = this.antropometria.muneca;

    var extra3 = this.antropometria.abdomen;
    var extra4 = this.antropometria.acroestiloide;

    var extra5 = this.antropometria.medioestdact;
    var extra6 = this.antropometria.trocanterea;

    var extra7 = this.antropometria.tribiallateral;
    var extra8 = this.antropometria.tibMdMaleolar
    var extra9 = this.antropometria.acroradial;
    var extra10 = this.antropometria.ilioespinal;

    var comentarios = this.antropometria.trocTipLat;
    var extra9 = this.antropometria.pie;
    // var extra10 = this.antropometria.anotaciones;

    // var comentarios = this.antropometria.prescripciones;





    // Código para guardar la persona
    this.antropometriaServicio.registrarPersona(this.antropometria).subscribe(dato => {
      this.obtenerpersona();
    }, error => {

      console.log(error);
      alert('La persona ha sido guardada correctamente');

      // Llamada al método para obtener la lista de personas después de guardar una nueva persona
    },

    );

    // this.antropometria.apellido = '';
    // this.antropometria.nombre = '';
    // this.antropometria.tipodocumento = '';
    // this.antropometria.documento = '';
    // this.antropometria.civil = '';
    // this.antropometria.fechanacimiento = '';
    // this.antropometria.direccion = '';
    // this.antropometria.grupo = '';
    // this.antropometria.sexo = '';
    // this.antropometria.direccion = '';

    // this.antropometria.cp = '';
    // this.antropometria.direccion = '';
    // this.antropometria.obra = '';
    // this.antropometria.afiliado = '';
    // this.antropometria.telefono1 = '';
    // this.antropometria.telefono2 = '';
    // this.antropometria.telefono3 = '';

    // this.antropometria.campoCfg1 = '';
    // this.antropometria.campoCfg2 = '';

    // this.antropometria.campoCfg3 = '';
    // this.antropometria.clinicos = '';

    // this.antropometria.familiar = '';
    // this.antropometria.diagnostico = '';
    // this.antropometria.cormobilidades = '';
    // this.antropometria.extra1 = '';
    // this.antropometria.extra2 = '';

    // this.antropometria.extra3 = '';
    // this.antropometria.extra4 = '';

    // this.antropometria.extra5 = '';
    // this.antropometria.extra6 = '';

    // this.antropometria.extra7 = '';
    // this.antropometria.extra8 = '';
    // this.antropometria.extra9 = '';
    // this.antropometria.extra10 = '';

    // this.antropometria.comentarios = '';


  }



  onSubmit() {
    this.guardarPersona();
  }
}