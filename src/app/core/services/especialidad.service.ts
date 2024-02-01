import { Injectable } from '@angular/core';
import { API_URL } from './API_URL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Especialidad } from 'src/app/authentication/register/Models/Especialidad.model';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  urlEndPoint = API_URL + '/especialidad';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getPersons(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(this.urlEndPoint);
  }

  createPerson(especialidad: Especialidad): Observable<Especialidad> {
    return this.http.post<Especialidad>(this.urlEndPoint+'/crear', especialidad, { headers: this.httpHeaders })
  }

  getPersonById(id: any): Observable<Especialidad> {
    return this.http.get<Especialidad>(`${this.urlEndPoint}/${id}`)
  }

}
