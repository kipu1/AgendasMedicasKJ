import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from './paciente';



@Injectable({
  providedIn: 'root'
})
export class patientService {
  //esta url obtiene el listado de las maquinas en el backend
  url: string = 'http://localhost:8080/api/paciente';
  constructor(private httpClient : HttpClient) { }
 
 

  actualizarPersona( paciente: Paciente): Observable<object> {
    return this.httpClient.put(this.url + '/actualizar/', paciente);
  }
    guardarPersona(paciente: any) {
      return this.httpClient.post(this.url+'/listar', paciente);
    }
    
      //este metodo trae las maquinas
    obtenerListaPersona(): Observable<Paciente[]>{
      return this.httpClient.get<Paciente[]>(this.url+'/listar');
    }  
    
    eliminarPersona(id:number): Observable<object>{
      return this.httpClient.delete(this.url+'/eliminar/'+id);
    }
    
    registrarPersona(paciente:Paciente): Observable<Object>{
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
