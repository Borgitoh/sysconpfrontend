import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoImoveisService {
  private apiUrl = 'https://sysconp-api-1.onrender.com/property';

  constructor(private http: HttpClient) {}

  getTipoImoveis(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}-read/types/all`);
  }

  addTipoImovel(imovel:any): Observable<any[]> {

   return this.http.post<any[]>(`${this.apiUrl}/type/create`, imovel);
  }
}
