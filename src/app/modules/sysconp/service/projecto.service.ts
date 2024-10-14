import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectoService {
  private apiUrl = 'https://sysconp-api-1.onrender.com/project'; 

  constructor(private http: HttpClient) {}

  getProjecto(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/all');
  }
}
