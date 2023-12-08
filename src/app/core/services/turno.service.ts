import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Turno } from '../calendar/turno';






@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  //esta url obtiene el listado de las maquinas en el backend
  url: string = 'http://localhost:8080/api/turno';
  constructor(private httpClient : HttpClient) { }
 
 

  actualizarPersona( id:number,turno: Turno): Observable<object> {
    return this.httpClient.put(this.url + '/actualizar/'+id, turno);
  }
    guardarPersona(turno: any) {
      return this.httpClient.post(this.url+'/listar', turno);
    }
    
      //este metodo trae las maquinas
    obtenerListaPersona(): Observable<Turno[]>{
      return this.httpClient.get<Turno[]>(this.url+'/listar');
    }  
    Buscarid(id:number): Observable<Turno>{
      return this.httpClient.get<Turno>(this.url+'/listar/'+id);
    }
    
    eliminarPersona(id:number): Observable<object>{
      return this.httpClient.delete(this.url+'/eliminar/'+id);
    }
    
    registrarPersona(turno:Turno): Observable<Object>{
    return this.httpClient.post(this.url+'/crear',turno);
    }
    
    // actualizarpaciente(id:number): Observable<Paciente>{
    //   return this.httpClient.get<Paciente>(this.url+'/actualizar/'+id);
    // }
    
    
   


}
