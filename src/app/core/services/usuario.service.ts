import { Injectable } from '@angular/core';
import { API_URL } from './API_URL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usuario } from 'src/app/authentication/register/Models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  urlEndPoint = API_URL + '/usuario';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getUsers(): Observable<usuario[]> {
    return this.http.get<usuario[]>(this.urlEndPoint);
  }

  createUser(user: usuario): Observable<usuario> {
    return this.http.post<usuario>(this.urlEndPoint+'/crear', user, { headers: this.httpHeaders })
  }

  getUserById(id: any): Observable<usuario> {
    return this.http.get<usuario>(`${this.urlEndPoint}/${id}`)
  }

}
