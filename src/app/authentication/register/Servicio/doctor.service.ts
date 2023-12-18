import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../Models/Doctor';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private url: string = 'http://localhost:8080/auth/registers';
  private url1: string = 'http://localhost:8080/api/auths';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) {

   }

   crear (doctor: Doctor): Observable <Doctor>{
    return this.http.post<Doctor>(this.url,doctor,{headers: this.httpHeaders})
   }

   

 


}
