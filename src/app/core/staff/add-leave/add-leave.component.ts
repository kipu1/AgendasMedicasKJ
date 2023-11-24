import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { AntropometriaService } from '../antropometria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Antropometria } from '../antropometria';
interface data {
  value: string;
}
@Component({
  selector: 'app-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrls: ['./add-leave.component.scss']
})
export class AddLeaveComponent {
  public routes = routes;
  id!: number;
  antropometria: Antropometria = new Antropometria();
  antropometrias: Antropometria[] = [];
  validador: boolean = false;


  // identificacion: String;
  pacienteActualizado = new Antropometria();
  constructor(private auth: AuthService, private antroService: AntropometriaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {


    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.obtenerpersona(); // Actualizar la lista después de la actualización
      this.antroService.Buscarid(this.id).subscribe(
        response => {
          this.antropometria = response
          // Asigna los datos del paciente al modelo
        });
      // Ahora puedes usar el ID como desees en tu componente
    })


    this.obtenerpersona(); // Actualizar la lista después de la actualización

    // Restablecer los valores del objeto this.paciente

  }



  obtenerpersona() {
    this.antroService.obtenerListaPersona().subscribe(dato => {
      this.antropometrias = dato;
    });
  }



  actualizarDatos(idAntropometria: number): void {
    console.log('Datos actualizados:', idAntropometria);

    const fecha = this.antropometria.fecha;
    const edad = this.antropometria.edad;
    const peso = this.antropometria.peso;
    const talla = this.antropometria.talla;
    const tronco = this.antropometria.tronco;
    const dsuspino = this.antropometria.dsuspino;
    const envergadura = this.antropometria.envergadura;
    const bicipital = this.antropometria.bicipital;
    const ileocristal = this.antropometria.ileocristal;
    const supraespinal = this.antropometria.supraespinal;
    const axilar = this.antropometria.axilar;
    const abdominal = this.antropometria.abdominal;
    const tricipital = this.antropometria.tricipital;
    const subescapular = this.antropometria.subescapular;
    const pectoral = this.antropometria.pectoral;
    const gemelo = this.antropometria.gemelo;
    const muslofrontal = this.antropometria.muslofrontal;
    const humeral = this.antropometria.humeral;
    const femoral = this.antropometria.femoral;
    const biacromial = this.antropometria.biacromial;
    const biileocretideo = this.antropometria.biileocretideo;
    const toraxap = this.antropometria.toraxap;
    const muslo = this.antropometria.muslo;
    const tobillo = this.antropometria.tobillo;
    const biliacodi = this.antropometria.biliacodi;
    const muneca = this.antropometria.muneca;
    const toraxtrans = this.antropometria.toraxtrans;
    const cefalico = this.antropometria.cefalico;
    const torax = this.antropometria.torax;
    const antebrazo = this.antropometria.antebrazo;
    const tobillo1 = this.antropometria.tobillo1;
    const cintura = this.antropometria.cintura;
    const cuello = this.antropometria.cuello;
    const bicipitalrel = this.antropometria.bicipitalrel;
    const bicitalflex = this.antropometria.bicitalflex;
    const muslo1 = this.antropometria.muslo1;
    const cadera = this.antropometria.cadera;
    const muneca1 = this.antropometria.muneca1;
    const gemelo1 = this.antropometria.gemelo1;
    const abdomen = this.antropometria.abdomen;
    const acroestiloide = this.antropometria.acroestiloide;
    const medioestdact = this.antropometria.medioestdact;
    const trocanterea = this.antropometria.trocanterea;
    const tribiallateral = this.antropometria.tribiallateral;
    const tibMdMaleolar = this.antropometria.tibMdMaleolar;
    const acroradial = this.antropometria.acroradial;
    const ilioespinal = this.antropometria.ilioespinal;
    const pie = this.antropometria.pie;
    const anotaciones = this.antropometria.anotaciones;
    const prescripciones = this.antropometria.prescripciones;


    // const nuevoSexo = this.paciente.sexo;


    // Crear un objeto 'pacienteActualizado' con los valores actualizados
    this.pacienteActualizado.fecha = fecha;
    this.pacienteActualizado.edad = edad;
    this.pacienteActualizado.peso = peso;
    this.pacienteActualizado.talla = talla;
    this.pacienteActualizado.tronco = tronco;
    this.pacienteActualizado.dsuspino = dsuspino;
    this.pacienteActualizado.envergadura = envergadura;
    this.pacienteActualizado.bicipital = bicipital;
    this.pacienteActualizado.ileocristal = ileocristal;
    this.pacienteActualizado.supraespinal = supraespinal;
    this.pacienteActualizado.axilar = axilar;
    this.pacienteActualizado.abdominal = abdominal;
    this.pacienteActualizado.tricipital = tricipital;
    this.pacienteActualizado.subescapular = subescapular;
    this.pacienteActualizado.pectoral = pectoral;
    this.pacienteActualizado.gemelo = gemelo;
    this.pacienteActualizado.muslofrontal = muslofrontal;
    this.pacienteActualizado.humeral = humeral;
    this.pacienteActualizado.femoral = femoral;
    this.pacienteActualizado.biacromial = biacromial;
    this.pacienteActualizado.biileocretideo = biileocretideo;
    this.pacienteActualizado.toraxap = toraxap;
    this.pacienteActualizado.muslo = muslo;
    this.pacienteActualizado.tobillo = tobillo;
    this.pacienteActualizado.biliacodi = biliacodi;
    this.pacienteActualizado.muneca = muneca;
    this.pacienteActualizado.toraxtrans = toraxtrans;
    this.pacienteActualizado.cefalico = cefalico;
    this.pacienteActualizado.torax = torax;
    this.pacienteActualizado.antebrazo = antebrazo;
    this.pacienteActualizado.tobillo1 = tobillo1;
    this.pacienteActualizado.cintura = cintura;
    this.pacienteActualizado.cuello = cuello;

    this.pacienteActualizado.bicipitalrel = bicipitalrel;
    this.pacienteActualizado.bicitalflex = bicitalflex;
    this.pacienteActualizado.muslo1 = muslo1;
    this.pacienteActualizado.cadera = cadera;
    this.pacienteActualizado.muneca1 = muneca1;
    this.pacienteActualizado.gemelo1 = gemelo1;
    this.pacienteActualizado.acroestiloide = acroestiloide;
    this.pacienteActualizado.medioestdact = medioestdact;
    this.pacienteActualizado.trocanterea = trocanterea;
    this.pacienteActualizado.tribiallateral = tribiallateral;
    this.pacienteActualizado.tibMdMaleolar = tibMdMaleolar;

    this.pacienteActualizado.acroradial = acroradial;
    this.pacienteActualizado.ilioespinal = ilioespinal;
    this.pacienteActualizado.pie = pie;

    this.pacienteActualizado.anotaciones = anotaciones;
    this.pacienteActualizado.prescripciones = prescripciones;



    // Llamar al método actualizarPersona() del servicio para enviar los datos actualizados al servidor
    this.antroService.actualizarPersona(this.id, this.pacienteActualizado).subscribe(
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
}
