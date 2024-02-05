import { Injectable } from '@angular/core';
import { API_URL } from './API_URL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { rol } from 'src/app/authentication/register/Models/rol';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  urlEndPoint = API_URL + '/rol';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getRols(): Observable<rol[]> {
    return this.http.get<rol[]>(this.urlEndPoint);
  }

  createRol(role: rol): Observable<rol> {
    return this.http.post<rol>(this.urlEndPoint + '/crear', role, { headers: this.httpHeaders })
  }

  getRolById(id: any): Observable<rol> {
    return this.http.get<rol>(`${this.urlEndPoint}/${id}`)
  }

}
