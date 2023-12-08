import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { DataService } from 'src/app/shared/data/data.service';
import { apiResultFormat, pageSelection, staffList } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { AntropometriaService } from '../../services/antropometria.service';
import { Router } from '@angular/router';
import { Antropometria } from '../antropometria';
import { Paciente } from '../../patient/paciente';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit{
  public routes = routes;
  public staffList: Array<staffList> = [];
  dataSource!: MatTableDataSource<staffList>;
  antropometria: Antropometria[] = [];
  antropometrias: Antropometria = new Antropometria();
  paciente:Paciente[] = [];

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

  constructor(public data : DataService,private auth:AuthService, private antropometriaService:AntropometriaService,private router:Router){

  }
  ngOnInit() {
    this.obtenerPersona();
    this.getTableData();
  }
 actualizarPersona(id:number){
    //aqui solo dirige ala pagina de actualizar maquina
    this.router.navigate([routes.addLeave,{id}]);
  }
  
  obtenerPersona(){
    this.antropometriaService.obtenerListaPersona().subscribe(dato => {
  this.antropometria=dato;
    });}

  // obtenerPersona(){
  //   this.antropometriaService.obtenerListaPersona().subscribe(dato => {
  // this.antropometria=dato;
  // this.antropometria.forEach((antropometria: Antropometria) => {
  //   this.paciente=antropometria.idPaciente
  // });
  // console.log(dato)
  //   });}

    eliminarPersona(id: number) {
      this.antropometriaService.eliminarPersona(id).subscribe(() => {
        this.obtenerPersona(); // Para actualizar la lista después de la eliminación
      });
    }
  
  
  private getTableData(): void {
    this.staffList = [];
    this.serialNumberArray = [];

    this.data.getStaffList().subscribe((data: apiResultFormat) => {
      this.totalData = data.totalData;
      data.data.map((res: staffList, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
         
          this.staffList.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<staffList>(this.staffList);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.staffList = this.dataSource.filteredData;
  }

  public sortData(sort: Sort) {
    const data = this.staffList.slice();

    if (!sort.active || sort.direction === '') {
      this.staffList = data;
    } else {
      this.staffList = data.sort((a, b) => {
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