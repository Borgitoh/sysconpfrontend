import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendasService {
  private apiUrl = 'https://sysconp-api-1.onrender.com/sale';

  constructor(private http: HttpClient) {}

  getVendas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/all');
  }

  addVenda(venda: any): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}`, venda);
  }

  CancelarVenda(venda: any, id:any): Observable<any> {

    return this.http.put<any>(`${this.apiUrl}/update/${id}`, venda);
  }

  editStatusVenda(venda: any, id:any): Observable<any> {

    return this.http.put<any>(`${this.apiUrl}/update/change-password/${id}`, venda);
  }
}
