import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contrato {
  Id: number;
  nome: string;
  funcao: string;
  dataInicio: string;
  dataFim: string;
  descricao: string;
  horasSemanais: number;
  salarioHora: number;
  nomePessoa: string;
}

export interface CreateContratoDto {
  pessoaId: number;
  perfilId: number;
  dataInicio: string;
  dataFim: string;
  descricao: string;
  horasSemanais: number;
  salarioHora: number;
}

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  private apiUrl = 'http://localhost:8080/contrato';

  constructor(private http: HttpClient) {}

  getContratos(): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(this.apiUrl);
  }

  getContratosByPessoaId(id: number): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(`${this.apiUrl}/${id}`);
  }

  createContrato(contrato: CreateContratoDto): Observable<HttpResponse<void>> {
    return this.http.post<void>(this.apiUrl, contrato, { observe: 'response' });
  }
}
