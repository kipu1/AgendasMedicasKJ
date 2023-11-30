import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Paciente } from './paciente';



@Injectable({
  providedIn: 'root'
})
export class patientService {
  //esta url obtiene el listado de las maquinas en el backend
  url: string = 'http://localhost:8080/api/paciente';
  constructor(private httpClient : HttpClient) { }
 
 

  actualizarPersona( id:number,paciente: Paciente): Observable<object> {
    return this.httpClient.put(this.url + '/actualizar/'+id, paciente);
  }
    guardarPersona(paciente: any) {
      return this.httpClient.post(this.url+'/listar', paciente);
    }
    
      //este metodo trae las maquinas
    obtenerListaPersona(): Observable<Paciente[]>{
      return this.httpClient.get<Paciente[]>(this.url+'/listar');
    }  
    Buscarid(id:number): Observable<Paciente>{
      return this.httpClient.get<Paciente>(this.url+'/listar/'+id);
    }
    
    eliminarPersona(id:number): Observable<object>{
      return this.httpClient.delete(this.url+'/eliminar/'+id);
    }
    
    registrarPersona(paciente:Paciente): Observable<Object>{
    return this.httpClient.post(this.url+'/crear',paciente);
    }
    subirImagen(formData: FormData): Observable<object> {
      return this.httpClient.post(`${this.url}/upload`, formData).pipe(
        tap(response => console.log('Respuesta del servidor:', response)),
        catchError(error => {
          console.error('Error en la carga de la imagen:', error);
          throw error;
        })
      );
    }
    actualizarFoto(id: number, file: File): Observable<any> {
      const formData = new FormData();
      formData.append('file', file);
  
      return this.httpClient.post<any>(`${this.url}/upload/${id}`, formData);
    }
    // crearPacienteConImagen(paciente: Paciente, file: File): Observable<Object> {
    //   const formData: FormData = new FormData();
    //   formData.append('file', file);
  
    //   // Agrega otras propiedades del paciente al formData si es necesario
    //   formData.append('nombre', paciente.nombre);
  
    //   const headers = new HttpHeaders(); // Opciones de encabezados opcionales
  
    //   return this.httpClient.post<any>(`${this.url}/crear`, formData, { headers });
    // }
  
    // // Método para obtener la URL de la imagen de un paciente
    // obtenerURLImagen(id: number): Observable<string> {
    //   return this.httpClient.get<string>(`${this.url}/${id}/imagen`);
    // }
 
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
