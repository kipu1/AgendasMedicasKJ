import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Odontologia } from '../departments/odontologia';




@Injectable({
  providedIn: 'root'
})
export class OdontologiaService {
  //esta url obtiene el listado de las maquinas en el backend
  url: string = 'http://localhost:8080/api/odontologia';
  constructor(private httpClient : HttpClient) { }
 
 

  actualizarPersona( id:number,paciente: Odontologia): Observable<object> {
    return this.httpClient.put(this.url + '/actualizar/'+id, paciente);
  }
    guardarPersona(paciente: any) {
      return this.httpClient.post(this.url+'/listar', paciente);
    }
    
      //este metodo trae las maquinas
    obtenerListaPersona(): Observable<Odontologia[]>{
      return this.httpClient.get<Odontologia[]>(this.url+'/listar');
    }  
    Buscarid(id:number): Observable<Odontologia>{
      return this.httpClient.get<Odontologia>(this.url+'/listar/'+id);
    }
    
    eliminarPersona(id:number): Observable<object>{
      return this.httpClient.delete(this.url+'/eliminar/'+id);
    }
    
    registrarPersona(paciente:Odontologia): Observable<Object>{
    return this.httpClient.post(this.url+'/crear',paciente);
    }
    
    // actualizarpaciente(id:number): Observable<Paciente>{
    //   return this.httpClient.get<Paciente>(this.url+'/actualizar/'+id);
    // }
    
    
   

// actualizarPersona(id:number,persona:Persona):Observable<object>{
// return this.httpClient.put(environment.api_uri+'/persona/actualizar/'+id,persona);
// }
// guardarPersona(persona: any) {
//   return this.httpClient.post(environment.api_uri+'/persona/listar', persona);
// }

//   //este metodo trae las maquinas
// obtenerListaPersona(): Observable<Persona[]>{
//   return this.httpClient.get<Persona[]>(environment.api_uri+'/persona/listar');
// }  

// eliminarPersona(id:number): Observable<object>{
//   return this.httpClient.delete(environment.api_uri+'/persona/delete/'+id);
// }

// registrarPersona(persona:Persona): Observable<Object>{
// return this.httpClient.post(environment.api_uri+'/persona/crear',persona);
// }

// obtenerPersonaPorId(id:number): Observable<Persona>{
//   return this.httpClient.get<Persona>(environment.api_uri+'/persona/porid/'+id);
// }


// obtenerPersonaPoridentificacion(identificacion:string): Observable<Persona>{
//   return this.httpClient.get<Persona>(environment.api_uri+'/persona/personas/'+identificacion);
// }
 
}
