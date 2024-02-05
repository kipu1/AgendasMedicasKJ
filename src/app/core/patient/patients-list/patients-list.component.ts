import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { MatTableDataSource } from "@angular/material/table";
import { pageSelection, apiResultFormat } from 'src/app/shared/models/models';
import { Sort } from '@angular/material/sort';
import { DataService } from 'src/app/shared/data/data.service';

import { AuthService } from 'src/app/shared/auth/auth.service';
import { Router } from '@angular/router';
import { Paciente } from '../../../authentication/register/Models/paciente';
import { DatePipe } from '@angular/common';
import { patientService } from '../../services/patient.service';
import { PersonaService } from '../../services/persona.service';
import { persona } from 'src/app/authentication/register/Models/persona';


@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent implements OnInit {
  paciente: Paciente[] = [];
  // public PacienteList: Array<Paciente> = [];
  public routes = routes;
  // dataSource = new MatTableDataSource<Paciente>;
  dataSource!: MatTableDataSource<Paciente>;


  pacientes: Paciente[] = [];
  personsList: persona[] = [];

  public showFilter = false;
  public searchDataValue = '';
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;

  constructor(public data: DataService, 
    private auth: AuthService, 
    private pacienteService: patientService, 
    private router: Router, 
    private personService: PersonaService) {
    this.pacientes = [];
    this.dataSource = new MatTableDataSource<Paciente>(this.pacientes);
  }

  ngOnInit() {
    //this.getTableData();
    this.getPersonsPatient();
  }


  getPersonsPatient(): void {
    this.personService.getPersons().subscribe(persons => { 
      this.personsList = persons;
      console.log(this.personsList);
    });
  }

  private getTableData(): void {
    this.paciente = [];
    this.serialNumberArray = [];

    this.pacienteService.obtenerListaPersona().subscribe(
      (data: Paciente[]) => {
        // Ahora 'data' es un array de tipo 'Paciente'
        this.totalData = data.length; // O ajusta esto según la estructura de tu respuesta
        data.map((res: Paciente, index: number) => {
          const serialNumber = index + 1;
          if (index >= this.skip && serialNumber <= this.limit) {
            this.paciente.push(res);
            this.serialNumberArray.push(serialNumber);
          }
        });
        this.dataSource = new MatTableDataSource<Paciente>(this.paciente);
        this.calculateTotalPages(this.totalData, this.pageSize);
      },
      (error) => {
        console.error('Error al obtener la lista de personas', error);
        // Maneja el error según tus necesidades
      }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.paciente = this.dataSource.filteredData;
  }

  applyFilter(event: KeyboardEvent) {
    //console.log('Filtering...'); // Verifica si este mensaje aparece en la consola
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.paciente = this.dataSource.filteredData;
  }
  public sortData(sort: Sort) {
    const data = this.paciente.slice();

    if (!sort.active || sort.direction === '') {
      this.paciente = data;
    } else {
      this.paciente = data.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];

        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  actualizarPersona(id: number) {
    //aqui solo dirige ala pagina de actualizar maquina
    this.router.navigate([routes.editPatient, { id }]);
  }
  // actualizarPersona(id:number){
  //   //aqui solo dirige ala pagina de actualizar maquina
  //   this.router.navigate([routes.editPatient,id]);
  // }

  obtenerPersona() {
    this.pacienteService.obtenerListaPersona().subscribe(dato => {
      this.paciente = dato;
    });
  }

  eliminarPersona(id: number) {
    // Mostrar la alerta personalizada
    this.mostrarAlerta('¿Desea eliminar esta persona?').then((confirmacion) => {
      // Si el usuario hace clic en "Aceptar" en la alerta personalizada
      if (confirmacion) {
        this.pacienteService.eliminarPersona(id).subscribe(() => {
          // Actualizar la lista después de eliminar
          this.obtenerPersona();

          // Recargar la página después de la eliminación
          location.reload();
        });
      }
    });
  }

  recargarPagina() {
    // Recargar la página
    location.reload();
  }

  mostrarAlerta(mensaje: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const customAlert = document.getElementById('customAlert') as HTMLElement;
      const alertMessage = document.getElementById('alertMessage') as HTMLElement;
      const confirmButton = document.getElementById('confirmButton') as HTMLButtonElement;
      const cancelButton = document.getElementById('cancelButton') as HTMLButtonElement;

      // Configurar el mensaje
      alertMessage.innerText = mensaje;

      // Mostrar la alerta
      customAlert.style.display = 'flex';

      // Configurar eventos de los botones
      confirmButton.onclick = () => {
        customAlert.style.display = 'none';
        resolve(true);
      };

      cancelButton.onclick = () => {
        customAlert.style.display = 'none';
        resolve(false);
      };
    });
  }

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableData();
  }

  public PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    /* eslint no-var: off */
    for (var i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
}
