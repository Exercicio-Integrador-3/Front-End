import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pessoa {
  id: number;
  nome: string; 
}

export interface CreatePessoaDto {
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private apiUrl = 'http://localhost:8080/pessoa';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.apiUrl);
  }

  getById(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.apiUrl}/${id}`);
  }

  getAllIds(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/ids`);
  }

  create(pessoa: CreatePessoaDto): Observable<HttpResponse<void>> {
    return this.http.post<void>(this.apiUrl, pessoa, { observe: 'response' });
  }
}
