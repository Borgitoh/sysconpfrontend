import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://sysconp-api-1.onrender.com/user'; 

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/all');
  }
  

  addUsuario(usuario: any): Observable<any> {
    
    return this.http.post<any>(`${this.apiUrl}`, usuario);
  }
}
