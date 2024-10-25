import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendasService {
  private apiUrl = 'http://localhost:8000/vendas';

  constructor(private http: HttpClient) {}

  getVendas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addVenda(venda: any): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}`, venda);
  }
  getDocumentoBy(name:any): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8000/documentos?type=${name}`);
  }

  CancelarVenda(venda: any, id:any): Observable<any> {
    venda.status ='Pendente'
    venda.flExcluida = false
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, venda);
  }

  editStatusVenda(venda: any, id:any): Observable<any> {

    return this.http.put<any>(`${this.apiUrl}/update/change-password/${id}`, venda);
  }
}
