import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Paciente } from '../../authentication/register/Models/paciente';
import { API_URL } from './API_URL';

@Injectable({
  providedIn: 'root'
})
export class patientService {

  EndPoint: string = API_URL + '/paciente';
  constructor(private httpClient: HttpClient) { }

  actualizarPersona(id: number, paciente: Paciente): Observable<object> {
    return this.httpClient.put(this.EndPoint + '/actualizar/' + id, paciente);
  }

  guardarPersona(paciente: any) {
    return this.httpClient.post(this.EndPoint + '/listar', paciente);
  }

  createPatient(paciente: Paciente): Observable<Object> {
    return this.httpClient.post(this.EndPoint + '/crear', paciente);
  }

  obtenerListaPersona(): Observable<Paciente[]> {
    return this.httpClient.get<Paciente[]>(this.EndPoint + '/listar');
  }
  Buscarid(id: number): Observable<Paciente> {
    return this.httpClient.get<Paciente>(this.EndPoint + '/listar/' + id);
  }

  eliminarPersona(id: number): Observable<object> {
    return this.httpClient.delete(this.EndPoint + '/eliminar/' + id);
  }

  registrarPersona(paciente: Paciente): Observable<Object> {
    return this.httpClient.post(this.EndPoint + '/crear', paciente);
  }
  // registrarPaciente(paciente: Paciente, foto: File): Observable<Object> {
  //   const formData: FormData = new FormData();
  //   formData.append('paciente', JSON.stringify(paciente));
  //   formData.append('file', foto);

  //   return this.httpClient.post(this.EndPoint + '/crear', formData);
  // }
  // registrarPersona(paciente: Paciente, foto?: File): Observable<Object> {
  //   const formData: FormData = new FormData();
  //   formData.append('paciente', JSON.stringify(paciente));

  //   if (foto) {
  //     formData.append('file', foto);
  //   }

  //   const headers = new HttpHeaders();
  //   // No es necesario establecer el Content-Type, Angular lo manejará automáticamente para FormData.

  //   return this.httpClient.post(this.EndPoint + '/crear', formData, { headers });
  // }
  // subirImagen(formData: FormData): Observable<object> {
  //   return this.httpClient.post(`${this.EndPoint}/upload`, formData).pipe(
  //     tap(response => console.log('Respuesta del servidor:', response)),
  //     catchError(error => {
  //       console.error('Error en la carga de la imagen:', error);
  //       throw error;
  //     })
  //   );
  // }
  // actualizarFoto(id: number, file: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('file', file);

  //   return this.httpClient.post<any>(`${this.EndPoint}/upload/${id}`, formData);
  // }
  subirOActualizarFoto(id: number | null, file: File): Observable<object> {
    const formData = new FormData();
    formData.append('file', file);

    const EndPoint = id ? `${this.EndPoint}/upload/${id}` : `${this.EndPoint}/upload`;

    return this.httpClient.post(EndPoint, formData).pipe(
      tap(response => console.log('Respuesta del servidor:', response)),
      catchError(error => {
        console.error('Error en la carga de la imagen:', error);
        throw error;
      })
    );
  }
  // descargarArchivo(filename: string): Observable<HttpResponse<Blob>> {
  //   const EndPoint = `${this.EndPoint}/${filename}`;
  //   return this.httpClient.get(EndPoint, {
  //     observe: 'response',
  //     responseType: 'blob',
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //   });
  // }
  descargarArchivo(pacienteId: string): Observable<HttpResponse<Blob>> {
    const EndPoint = `${this.EndPoint}/pacientes/${pacienteId}/imagen`; // Ajusta la EndPoint para reflejar tu estructura de API
    return this.httpClient.get(EndPoint, {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }




}
