import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { Odontologia } from '../odontologia';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { OdontologiaService } from '../odontologia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent 
  implements OnInit, AfterViewInit, OnChanges {
    // fillColor: String = "white";
    fillColor: string = "white";
    fill: any;
    htmlString!: string;
    nativo: any;
    public routes = routes;
    odonto: Odontologia = new Odontologia();
    odontos: Odontologia[] = [];
    // selectedOption!: string;
    validador: boolean = false;
    @ViewChild(TemplateRef, { static: true }) odontoTemplate!: TemplateRef<any>;
    @ViewChild(TemplateRef, { static: true, read: ViewContainerRef })
    odontoContainer!: ViewContainerRef;
    constructor(private auth: AuthService, private odontoService: OdontologiaService, private router: Router) {}
    ngOnChanges(changes: SimpleChanges): void {
      throw new Error("Method not implemented.");
    }
  
    ngOnInit(): void {
      this.obtenerpersona();
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
      const colorSeleccionado = this.fillColor;
     
  
  
  
  
  
      // Código para guardar la persona
      this.odonto.marca = colorSeleccionado;
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
  
      localStorage.setItem('odonto', JSON.stringify(this.odonto));
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
  