import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private apiUrl = 'https://api-sysconp.onrender.com/appointments'; 

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/all');
  }

  createAppointment(appointment: any): Observable<any> {
    console.log(appointment);
    
    const { name, email,bi, phone, dateVisit, visitTime} = appointment;
    return this.http.post<any>(this.apiUrl+'/create:33',  { name, email,bi, phone, dateVisit, visitTime});
  }
}
