import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectoService {
  private apiUrl = 'https://sysconp-api-1.onrender.com/project';

  constructor(private http: HttpClient) {}

  getProjectos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/all');
  }

  addItemProjecto(projecto:any): Observable<any[]> {

    const projectoitem = {
      name: projecto.name,
      description: projecto.description,
      address:projecto.provincia
      +','+projecto.municipio+'.'+ projecto.municipio
      +','+projecto.distrito+','+ projecto.morada,
      quantity: String(projecto.quantity),
      zoneId:'1'
    };
   return this.http.post<any[]>(`${this.apiUrl}/create/${localStorage.getItem('iduser')}`, projectoitem);
  }
}
