import { Injectable } from '@angular/core';
import { API_URL } from './API_URL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { persona } from 'src/app/authentication/register/Models/persona';
import { rol } from 'src/app/authentication/register/Models/rol';
import { NewUser } from 'src/app/authentication/register/Models/NewUser.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  urlEndPoint: string = API_URL + '/persona';

  httproute: string = 'http://localhost:8080/auth/register';

  httpPersona: string = 'http://localhost:8080/api/persona/crear';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getPersons(): Observable<persona[]> {
    return this.http.get<persona[]>(this.urlEndPoint);
  }

  createPerson(newUser: NewUser): Observable<number> {
    return this.http.post<number>(this.httproute, newUser, { headers: this.httpHeaders })
  }

  createPersonByObject(person: persona): Observable<persona> {
    return this.http.post<persona>(this.httpPersona, person, { headers: this.httpHeaders })
  }

  getPersonById(id: any): Observable<persona> {
    return this.http.get<persona>(`${this.urlEndPoint}/${id}`)
  }

  getPersonByEmail(email: any): Observable<persona> {
    return this.http.get<persona>(`${this.urlEndPoint}/${email}`)
  }
}
