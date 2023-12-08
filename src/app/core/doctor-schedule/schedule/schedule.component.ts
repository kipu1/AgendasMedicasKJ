import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/shared/data/data.service';
import { pageSelection, apiResultFormat, schedule } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { Libreta } from '../libreta';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { LibretaService } from '../../services/libreta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit{
  public routes = routes;
  libreta: Libreta[] = [];
  // public schedule: Array<Libreta> = [];
  dataSource!: MatTableDataSource<Libreta>;
  libretas: Libreta[] = [];

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

  constructor(public data : DataService,private auth:AuthService, private libretaService:LibretaService,private router:Router){
    this.libretas = [];
    this.dataSource = new MatTableDataSource<Libreta>(this.libretas);
  }
  ngOnInit() {
    this.obtenerPersona();
    this.getTableData();
  }
  actualizarPersona(id:number){
    //aqui solo dirige ala pagina de actualizar maquina
    this.router.navigate([routes.editSchedule,{id}]);
  }
  obtenerPersona(){
    this.libretaService.obtenerListaPersona().subscribe(dato => {
  this.libreta=dato;
    });}
    eliminarPersona(id: number) {
      // Mostrar la alerta personalizada
      this.mostrarAlerta('¿Desea eliminar esta persona?').then((confirmacion) => {
        // Si el usuario hace clic en "Aceptar" en la alerta personalizada
        if (confirmacion) {
          this.libretaService.eliminarPersona(id).subscribe(() => {
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
  
  private getTableData(): void {
    this.libreta = [];
    this.serialNumberArray = [];

    this.data.getSchedule().subscribe((data: apiResultFormat) => {
      this.totalData = data.totalData;
      data.data.map((res: Libreta, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
         
          this.libreta.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<Libreta>(this.libreta);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.libreta = this.dataSource.filteredData;
  }

  public sortData(sort: Sort) {
    const data = this.libreta.slice();

    if (!sort.active || sort.direction === '') {
      this.libreta = data;
    } else {
      this.libreta = data.sort((a, b) => {
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
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
