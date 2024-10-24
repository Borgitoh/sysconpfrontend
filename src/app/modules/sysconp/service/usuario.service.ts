import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://sysconp-api-1.onrender.com/user';
    private apiUrl2 = 'http://localhost:8000/clientes'

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/all');
  }


  addUsuario(usuario: any): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}`, usuario);
  }

  addcliente(usuario: any): Observable<any> {

    return this.http.post<any>(`${this.apiUrl2}`, usuario);
  }


  editUsuario(usuario: any, id:any): Observable<any> {

    return this.http.put<any>(`${this.apiUrl}/update/${id}`, usuario);
  }

  editSenha(usuario: any, id:any): Observable<any> {

    return this.http.put<any>(`${this.apiUrl}/update/change-password/${id}`, usuario);
  }
}
