import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/shared/data/data.service';
import { pageSelection, apiResultFormat, payments } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { OftamologiaService } from '../oftamologia.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Oftamologia } from '../oftamologia';
import { Router } from '@angular/router';
interface data {
  value: string ;
}
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {
  public routes = routes;
  oftamologia: Oftamologia = new Oftamologia();
 oftamologias: Oftamologia[] = [];
  validador: boolean = false;
  opcionSeleccionada: string = '';
  opcionOpciones: string = '';
  exploracionOptions: string[] = [];
  // identificacion: String;
  //change components


  constructor(private auth: AuthService, private oftamologiaService: OftamologiaService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerpersona();

  }

  obtenerpersona() {
    this.oftamologiaService.obtenerListaPersona().subscribe(dato => {
      this.oftamologias = dato;
    });
  }
 

// onOpcionSeleccionadaChange() {
//   switch (this.opcionSeleccionada) {
//     case 'Biomiscropia':
//       this.exploracionOptions = ['parpados', 'pestañas', 'glandulas'];
//       break;
//     // Agrega más casos según sea necesario
//     default:
//       this.exploracionOptions = [];
//       break;
//   }
// }
  onOpcionSeleccionadaChange() {
    switch (this.oftamologia.examenes) {
      case 'Biomiscropia':
        this.exploracionOptions = ['parpados', 'pestañas', 'glandulas de Meibomio', 'conjuntiva tarsal', 'conjuntiva bulbar', 'córnea', 'Esclera', 'Cámara anterior', 'Iris', 'Pupila', 'Lagrimal', 'Presión intraocular', 'Gonioscopía', 'Cristalino', 'Vitreo anterior', 'Nervio óptico', 'Reflejo fotomotor', 'Balance muscular', 'otros'];
        // o el valor predeterminado que desees
        break;

      case 'Oftalmoscopia':
        this.exploracionOptions = ['Cámara vitrea', 'Disco óptico', 'Mácula', 'Excavacion', 'Arcadas vasculares', 'Ora Serrata', 'Cadrante N.superior', 'Cadrante N. inferior', 'Cadrante T. superior', 'Cadrante T. inferior', 'ERP', 'Otros'];
        // o el valor predeterminado que desees
        break;
      case 'optometria Manifiesta':
        this.exploracionOptions = ['Esfera', 'Cilindro', 'Eje', 'A.V.', 'Adición', 'Prisma', 'Base', 'DNP/L', 'DNP/C', 'Altua', 'Otros'];
        // o el valor predeterminado que desees
        break;

      case 'optometria Prescripta':
        this.exploracionOptions = ['Esfera', 'Cilindro', 'Eje', 'A.V.', 'Adición', 'Prisma', 'Base', 'DNP/L', 'DNP/C', 'Altua', 'Otros'];
        // o el valor predeterminado que desees
        break;

      case 'Agudeza Visual':
        this.exploracionOptions = ['AVL S/C', 'AVL C/C', 'AVC S/C', 'AVC C/C', 'Otros'];
        // o el valor predeterminado que desees
        break;

      case 'Retinoscopia':
        this.exploracionOptions = ['Esfera C/C', 'Cilindro C/C', 'Eje C/C', 'Esfera S/C', 'Cilindro S/C', 'Eje S/C', 'Otros'];
        // o el valor predeterminado que desees
        break;

      case 'Queratometría':
        this.exploracionOptions = ['Dp', 'mm', 'Otros'];
        // o el valor predeterminado que desees
        break;
      // Agrega más casos según sea necesario
 
        
      case 'Oculomotor':
        this.exploracionOptions = ['PPM', 'Ducciones', 'Versiones', 'Convergencias', 'Incomitancias', 'Alteraciones', 'Otros'];
         // o el valor predeterminado que desees
        break;

        case 'Pecepción de colores':
          this.exploracionOptions = ['Prueba de Amster', 'Prueba de Ishihara', 'Confrontación', 'Otros'];
           // o el valor predeterminado que desees
          break;
          case 'Test de Pupila':
            this.exploracionOptions = ['Luz', 'Penumbra', 'Fotomotor', 'D.P.A','Otros'];
             // o el valor predeterminado que desees
            break;
            default:
        this.exploracionOptions = [];
        this.oftamologia.exploracion = ''; // o el valor predeterminado que desees
        break;
    }
  }

 
  opcionesMedicamentos: string[] = [
    "Biomiscropia",
    'Oftalmoscopia',
  'optometria Manifiesta',
  'optometria Prescripta',
  'Agudeza Visual',
  'Retinoscopia',
  'Queratometría',
  'Oculomotor',
  'Pecepción de colores',
  'Test de Pupila',
 
  ];
  medicamentoFilter: string = '';

  get medicamentosFiltrados(): string[] {
    return this.opcionesMedicamentos.filter(opcion =>
      opcion.toLowerCase().includes(this.medicamentoFilter.toLowerCase())
    );
  }
  // Método para manejar cambios en el cuadro de búsqueda
 
  guardardoctor() {
    console.log(this.oftamologia); // Verificar los valores de los campos

    var nombre = this.oftamologia.fecha;
    var clavesecreta = this.oftamologia.resultado;
    var comentarios = this.oftamologia.examenes;
    var direccion = this.oftamologia.exploracion;
    var especialidad = this.oftamologia.ojoizquierdo;
   
   


    this.router.navigate([this.routes.providentFund]).then(() => {
      window.location.reload();
    });



    // Código para guardar la persona
    this.oftamologiaService.registrarPersona(this.oftamologia).subscribe(dato => {
      this.obtenerpersona();
    }, error => {

      // console.log(error);
      // alert('La persona ha sido guardada correctamente');

      // Llamada al método para obtener la lista de personas después de guardar una nueva persona
    },

    );

    this.oftamologia.fecha = '';
    this.oftamologia.resultado = '';
    this.oftamologia.examenes = '';
    this.oftamologia.exploracion = '';
    this.oftamologia.ojoizquierdo = '';
    this.oftamologia.ojoderecho = '';
    this.oftamologia.anotaciones = '';
    

  }



  onSubmit() {
    this.guardardoctor();
  }
}
