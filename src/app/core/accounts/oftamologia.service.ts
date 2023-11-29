import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Oftamologia } from './oftamologia';





@Injectable({
  providedIn: 'root'
})
export class OftamologiaService {
  //esta url obtiene el listado de las maquinas en el backend
  url: string = 'http://localhost:8080/api/oftalmologia';
  constructor(private httpClient : HttpClient) { }
 
 

  actualizarPersona( id:number,oftamologia: Oftamologia): Observable<object> {
    return this.httpClient.put(this.url + '/actualizar/'+id, oftamologia);
  }
    guardarPersona(oftamologia: any) {
      return this.httpClient.post(this.url+'/listar', oftamologia);
    }
    
      //este metodo trae las maquinas
    obtenerListaPersona(): Observable<Oftamologia[]>{
      return this.httpClient.get<Oftamologia[]>(this.url+'/listar');
    }  
    Buscarid(id:number): Observable<Oftamologia>{
      return this.httpClient.get<Oftamologia>(this.url+'/listar/'+id);
    }
    
    eliminarPersona(id:number): Observable<object>{
      return this.httpClient.delete(this.url+'/eliminar/'+id);
    }
    
    registrarPersona(oftamologia:Oftamologia): Observable<Object>{
    return this.httpClient.post(this.url+'/crear',oftamologia);
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
