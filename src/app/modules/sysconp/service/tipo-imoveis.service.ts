import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoImoveisService {
  private apiUrl = 'http://localhost:8000/tipoImovel';

  constructor(private http: HttpClient) {}

  getTipoImoveis(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  addTipoImovel(imovel:any): Observable<any[]> {

   return this.http.post<any[]>(`${this.apiUrl}`, imovel);
  }
}
