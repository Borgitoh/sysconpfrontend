import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImoveisService {
  private apiUrl = 'http://localhost:8000/imovel';

  constructor(private http: HttpClient) { }

  getImoveis(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  getImoveisId(id:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}`);
  }

  getImoveisOcupado(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?iscupado=false`);
  }

  addImovel(imovel: any): Observable<any[]> {
    imovel.iscupado = false;
    imovel.flDelete = false;
    return this.http.post<any[]>(`${this.apiUrl}`, imovel);
  }

  statusImovel(imovel:any, id:any): Observable<any[]> {
    return this.http.put<any[]>(`${this.apiUrl}/${id}`, imovel);
  }
}
