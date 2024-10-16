import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModulosService {
  private apiUrl = 'https://sysconp-api-1.onrender.com/module';

  constructor(private http: HttpClient) {}

  getModulos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/all');
  }


  addModulo(modulo: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create/${localStorage.getItem('iduser')}`, modulo);
  }
}
