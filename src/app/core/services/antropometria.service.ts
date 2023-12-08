import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Antropometria } from '../staff/antropometria';




@Injectable({
  providedIn: 'root'
})
export class AntropometriaService {
  //esta url obtiene el listado de las maquinas en el backend
  url: string = 'http://localhost:8080/api/antropometria';
  constructor(private httpClient : HttpClient) { }
 
 

  actualizarPersona( id: number, antropometria: Antropometria): Observable<object> {
    return this.httpClient.put(this.url + '/actualizar/'+id,  antropometria);
  }
    guardarPersona(antropometria: any) {
      return this.httpClient.post(this.url+'/listar', antropometria);
    }
    
      //este metodo trae las maquinas
    obtenerListaPersona(): Observable<Antropometria[]>{
      return this.httpClient.get<Antropometria[]>(this.url+'/listar');
    }  
    Buscarid(id:number): Observable<Antropometria>{
      return this.httpClient.get<Antropometria>(this.url+'/listar/'+id);
    }
    
    eliminarPersona(id:number): Observable<object>{
      return this.httpClient.delete(this.url+'/eliminar/'+id);
    }
    
    registrarPersona(antropometria:Antropometria): Observable<Object>{
    return this.httpClient.post(this.url+'/crear',antropometria);
    }
    
    // actualizarpaciente(id:number): Observable<Paciente>{
    //   return this.httpClient.get<Paciente>(this.url+'/actualizar/'+id);
    // }
    
    
   


 
}
