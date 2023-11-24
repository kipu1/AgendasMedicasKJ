import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { Odontologia } from '../odontologia';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { OdontologiaService } from '../odontologia.service';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss']
})
export class EditDepartmentComponent implements OnInit, AfterViewInit, OnChanges {
  fillColor: String = "white";
  fill: any;
  htmlString!: string;
  nativo: any;
  public routes = routes;
  odonto: Odontologia = new Odontologia();
  odontos: Odontologia[] = [];
  id!: number;
  // selectedOption!: string;
  validador: boolean = false;
  @ViewChild(TemplateRef, { static: true }) odontoTemplate!: TemplateRef<any>;
  @ViewChild(TemplateRef, { static: true, read: ViewContainerRef })
  odontoContainer!: ViewContainerRef;
  pacienteActualizado= new Odontologia ();
  constructor(private auth: AuthService, private odontoService: OdontologiaService, private router: Router,private route: ActivatedRoute) {}
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error("Method not implemented.");
  }

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.obtenerpersona(); // Actualizar la lista después de la actualización
      this.odontoService.Buscarid(this.id).subscribe(
        response => {
            this.odonto=response
       // Asigna los datos del paciente al modelo
      });
      // Ahora puedes usar el ID como desees en tu componente
    })

    
      this.obtenerpersona(); // Actualizar la lista después de la actualización
  
      // Restablecer los valores del objeto this.paciente
    
  }
  obtenerpersona() {
    this.odontoService.obtenerListaPersona().subscribe(dato => {
      this.odontos = dato;
    });
  }
  
  guardardoctor() {
    console.log(this.odonto); // Verificar los valores de los campos

    var nombre = this.odonto.fecha;
    var clavesecreta = this.odonto.numerodiente;
    var comentarios = this.odonto.marca;
    var direccion = this.odonto.referecia1;
    var especialidad = this.odonto.referencia2;
    var telefono = this.odonto.referencia3;
    var clave = this.odonto.referencia4;
    var notaAuto = this.odonto.referencia5;
    var nota = this.odonto.anotaciones;
   
   





    // Código para guardar la persona
    this.odontoService.registrarPersona(this.odonto).subscribe(dato => {
      this.obtenerpersona();
    }, error => {

      console.log(error);
      alert('La persona ha sido guardada correctamente');

      // Llamada al método para obtener la lista de personas después de guardar una nueva persona
    },

    );

    this.odonto.fecha = '';
 
    this.odonto.marca = '';
    this.odonto.referencia2 = '';
    this.odonto.referencia3 = '';
    this.odonto.referencia4 = '';
    this.odonto.referencia5 = '';
    this.odonto.anotaciones = '';

  }
  actualizarDatos(idOdontologia: number): void {
    console.log('Datos actualizados:', idOdontologia);
    const nuevonombre = this.odonto.fecha;
    const nuevoclavesecre = this.odonto.numerodiente;
    const nuevocomentario = this.odonto.marca;

   
    const nuevadireccion = this.odonto.referecia1;
    const nuevaespecialidad = this.odonto.referencia2;
    const nuevotelefono = this.odonto.referencia3;
    const nuvaclave = this.odonto.referencia4;
    const nuevanotaauto = this.odonto.referencia5;
    const nuevanota = this.odonto.anotaciones;
 
    
    // const nuevoSexo = this.paciente.sexo;
  

    // Crear un objeto 'pacienteActualizado' con los valores actualizados
    this.pacienteActualizado.fecha=nuevonombre;
  
    this.pacienteActualizado.numerodiente=nuevoclavesecre;
    this.pacienteActualizado.marca=nuevocomentario;
   
    this.pacienteActualizado.referecia1=nuevadireccion;
    this.pacienteActualizado.referencia2=nuevaespecialidad;
    this.pacienteActualizado.referencia3=nuevotelefono;
    this.pacienteActualizado.referencia4=nuvaclave;
    this.pacienteActualizado.referencia5=nuevanotaauto;
    this.pacienteActualizado.anotaciones=nuevanota;
  


    // Llamar al método actualizarPersona() del servicio para enviar los datos actualizados al servidor
    this.odontoService.actualizarPersona(this.id,this.pacienteActualizado).subscribe(
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


  onSubmit() {
    this.guardardoctor();
  }
  ngAfterViewInit() {
    this.odontoContainer.createEmbeddedView(this.odontoTemplate);
  }

  changeColor(lado: HTMLElement) {
    this.fill = this.fillColor;
  
    const fillAttribute = lado.attributes.getNamedItem("fill");
  
    if (fillAttribute !== null) {
      fillAttribute.value = this.fill;
    }
  }

  amarillo() {
    this.fillColor = "yellow";
  }
  Gris() {
    this.fillColor = "grey";
  }
  rojo() {
    this.fillColor = "red";
  }
  plateado() {
    this.fillColor = "silver";
  }
  azul() {
    this.fillColor = "blue";
  }
  celeste() {
    this.fillColor = "skyblue";
  }
  verdeamarillo() {
    this.fillColor = "greenyellow";
  }
  verde() {
    this.fillColor = "green";
  }
  cafe() {
    this.fillColor = "brown";
  }
  lila() {
    this.fillColor = "plum";
  }
  purpura() {
    this.fillColor = "purple";
  }
  rosa() {
    this.fillColor = "pink";
  }
  naranja() {
    this.fillColor = "orange";
  }
  
  guardarOdonto() {
    // this.htmlString = odonto.innerHTML;
    // this.htmlString = odonto.innerHTML;
    this.nativo = this.odontoTemplate;
    const svgElements: NodeList = this.nativo.elementRef.nativeElement.ownerDocument.querySelectorAll(
      "svg"
    ) as NodeList;
    let toStore = "";
    // svgElements.forEach(
    //   (node: SVGElement) => (toStore = "<div>" + node.innerHTML + "</div>")
    // );
    console.log(toStore);
    localStorage.setItem("html", toStore);
  }
  cargarOdonto() {
    this.odontoTemplate = this.nativo;
  }
  
}

