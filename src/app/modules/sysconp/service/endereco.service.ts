import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  private apiUrl = 'https://apis.minfin.gov.ao/servicopublico/';

  constructor(private http: HttpClient) { }

  getProvincias(){
    return this.http.get<any[]>(`${this.apiUrl}provincia`);
  }

  getMunicipios(id:any){
    return this.http.get<any[]>(`${this.apiUrl}municipio?cdProvincia=${id}`);
  }

  getDistritos(id:any){
    return this.http.get<any[]>(`${this.apiUrl}comuna?cdMunicipio=${id}`);
  }

  getBairros(id:any){
    return this.http.get<any[]>(`${this.apiUrl}bairro?cdComuna=${id}`);
  }

}
