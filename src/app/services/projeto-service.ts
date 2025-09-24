import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Projeto {
  id: number;
  nome: string;
  dataInicio: string;
  dataFim: string;
  descricao: string;
}

export interface CreateProjetoDto {
  nome: string;
  dataInicio: string;
  dataFim: string;
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {
  private apiUrl = 'http://localhost:8080/projeto';

  constructor(private http: HttpClient) {}

  getProjetos(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(this.apiUrl);
  }

  getProjetoById(id: number): Observable<Projeto | null> {
    return this.http.get<Projeto | null>(`${this.apiUrl}/${id}`);
  }

  createProjeto(projeto: CreateProjetoDto): Observable<void> {
  return this.http.post<void>(this.apiUrl, projeto);
}

}
