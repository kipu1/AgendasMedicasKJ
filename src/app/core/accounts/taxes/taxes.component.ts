import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/shared/data/data.service';
import { pageSelection, apiResultFormat, taxes } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { Oftamologia } from '../oftamologia';

import { AuthService } from 'src/app/shared/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OftamologiaService } from '../../services/oftamologia.service';

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.scss']
})
export class TaxesComponent {
  public routes = routes;
  id!: number;
  oftamologia: Oftamologia = new Oftamologia();
  oftamologias: Oftamologia[] = [];
  validador: boolean = false;
  opcionSeleccionada: string = '';
  opcionOpciones: string = '';
  exploracionOptions: string[] = [];

  // identificacion: String;
   pacienteActualizado= new Oftamologia ();
  constructor(private auth: AuthService, private oftamologiaService: OftamologiaService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {


    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.obtenerpersona(); // Actualizar la lista después de la actualización
      this.oftamologiaService.Buscarid(this.id).subscribe(
        response => {
            this.oftamologia=response
       // Asigna los datos del paciente al modelo
      });
      // Ahora puedes usar el ID como desees en tu componente
    })

    
      this.obtenerpersona(); // Actualizar la lista después de la actualización
  
      // Restablecer los valores del objeto this.paciente
    
  }
   


  obtenerpersona() {
    this.oftamologiaService.obtenerListaPersona().subscribe(dato => {
      this.oftamologias = dato;
    });
  }



  actualizarDatos(id: number): void {
    console.log('Datos actualizados:', id);
    const nuevonombre = this.oftamologia.fecha;
    const nuevoclavesecre = this.oftamologia.resultado;
    const nuevocomentario = this.oftamologia.examenes;

   
    const nuevadireccion = this.oftamologia.exploracion;
    const nuevaespecialidad = this.oftamologia.ojoizquierdo;
    const nuevotelefono = this.oftamologia.ojoderecho;
    const nuvaclave = this.oftamologia.anotaciones;

   
 
    
    // const nuevoSexo = this.paciente.sexo;
  

    // Crear un objeto 'pacienteActualizado' con los valores actualizados
    this.pacienteActualizado.fecha=nuevonombre;
  
    this.pacienteActualizado.resultado=nuevoclavesecre;
    this.pacienteActualizado.examenes=nuevocomentario;
   
    this.pacienteActualizado.exploracion=nuevadireccion;
    this.pacienteActualizado.ojoizquierdo=nuevaespecialidad;
    this.pacienteActualizado.ojoderecho=nuevotelefono;
    this.pacienteActualizado.anotaciones=nuvaclave;

    this.router.navigate([this.routes.providentFund]).then(() => {
      window.location.reload();
    });


    // Llamar al método actualizarPersona() del servicio para enviar los datos actualizados al servidor
    this.oftamologiaService.actualizarPersona(this.id,this.pacienteActualizado).subscribe(
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
}
