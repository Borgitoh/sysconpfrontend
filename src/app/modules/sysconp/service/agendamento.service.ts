import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private apiUrl = 'https://sysconp-api-1.onrender.com/appointments'; 
  private apiUrl2 = 'https://sysconp-api-1.onrender.com/appointment'; 

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/all');
  }
  

  createAppointment(appointment: any): Observable<any> {
    const transformedAppointment = {
      name: appointment.client,       
      phone: String (appointment.numero),      
      visitDate: appointment.date,    
      visitTime: appointment.time,    
      projectId: appointment.project
    };

    return this.http.post<any>(`${this.apiUrl}/create/${localStorage.getItem('iduser')}`, transformedAppointment);
  }

  editAgendamento (appointment: any){
    const transformedAppointment = {
      name: appointment.client,       
      phone: String (appointment.numero),      
      visitDate: appointment.date,    
      visitTime: appointment.time,    
      projectId: appointment.project
    };

    return this.http.put<any>(`${this.apiUrl2}/update/${localStorage.getItem('iduser')}`, transformedAppointment);
  }

  confirmar (id: any){
    return this.http.put<any>(`${this.apiUrl2}/change-status/${id}`,id);
  }

  cancelar (id: any){
    return this.http.put<any>(`${this.apiUrl2}/cancel/${id}`,id);
  }
  
}
