import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data/data.service';
import { routes } from 'src/app/shared/routes/routes';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { pageSelection, apiResultFormat, doctorlist } from 'src/app/shared/models/models';
import { Doctor } from '../doctor';
import { DoctorService } from '../../services/doctor.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss']
})
export class DoctorsListComponent implements OnInit{
  public routes = routes;
  // public doctorsList: Array<Doctor> = [];
  dataSource!: MatTableDataSource<Doctor>;
  doctor: Doctor[] = [];
  // public PacienteList: Array<Paciente> = [];

  // dataSource = new MatTableDataSource<Paciente>;


  
  doctores: Doctor[] = [];
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

  constructor(public data : DataService,private auth:AuthService, private doctorservice:DoctorService,private router:Router){
    this.doctores = [];
    this.dataSource = new MatTableDataSource<Doctor>(this.doctores);
  }
  ngOnInit() {
    this.obtenerdoctor();
    this.getTableData();
  }
  obtenerdoctor(){
    this.doctorservice.obtenerListaPersona().subscribe(dato => {
  this.doctor=dato;
    });}
    eliminarPersona(id: number) {
      this.doctorservice.eliminarPersona(id).subscribe(() => {
        this.obtenerdoctor(); // Para actualizar la lista después de la eliminación
      });
    }
    actualizarPersona(id:number){
      //aqui solo dirige ala pagina de actualizar maquina
      this.router.navigate([routes.editDoctor,{id}]);
    }
  private getTableData(): void {
    this.doctor = [];
    this.serialNumberArray = [];

    this.data.getDoctorsList().subscribe((data: apiResultFormat) => {
      this.totalData = data.totalData;
      data.data.map((res: Doctor, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
         
          this.doctor.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<Doctor>(this.doctor);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.doctor = this.dataSource.filteredData;
  }

  public sortData(sort: Sort) {
    const data = this.doctor.slice();

    if (!sort.active || sort.direction === '') {
      this.doctor = data;
    } else {
      this.doctor = data.sort((a, b) => {
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
