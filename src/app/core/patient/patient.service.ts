import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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
    // registrarPaciente(paciente: Paciente, foto: File): Observable<Object> {
    //   const formData: FormData = new FormData();
    //   formData.append('paciente', JSON.stringify(paciente));
    //   formData.append('file', foto);
  
    //   return this.httpClient.post(this.url + '/crear', formData);
    // }
    // registrarPersona(paciente: Paciente, foto?: File): Observable<Object> {
    //   const formData: FormData = new FormData();
    //   formData.append('paciente', JSON.stringify(paciente));
    
    //   if (foto) {
    //     formData.append('file', foto);
    //   }
    
    //   const headers = new HttpHeaders();
    //   // No es necesario establecer el Content-Type, Angular lo manejará automáticamente para FormData.
    
    //   return this.httpClient.post(this.url + '/crear', formData, { headers });
    // }
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
    // descargarArchivo(filename: string): Observable<HttpResponse<Blob>> {
    //   const url = `${this.url}/${filename}`;
    //   return this.httpClient.get(url, {
    //     observe: 'response',
    //     responseType: 'blob',
    //     headers: new HttpHeaders({
    //       'Content-Type': 'application/json',
    //     }),
    //   });
    // }
    descargarArchivo(pacienteId: string): Observable<HttpResponse<Blob>> {
      const url = `${this.url}/pacientes/${pacienteId}/imagen`; // Ajusta la URL para reflejar tu estructura de API
      return this.httpClient.get(url, {
        observe: 'response',
        responseType: 'blob',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
    }



 
}
