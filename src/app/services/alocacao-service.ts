import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Alocacao{
  idPerfilPessoa: number,
  idProjeto: number,
  quantidadeHoras: number
}

export interface CreateAlocacaoDto {
  pessoaId: number;
  projetoId: number;
  contratoId: number;
  dataInicio: string;
  dataFim: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlocacaoService {
  private apiUrl = 'http://localhost:8080/alocacao';

  constructor(private http: HttpClient) {}

  createAlocacao(alocacao: CreateAlocacaoDto): Observable<HttpResponse<void>> {
    return this.http.post<void>(this.apiUrl, alocacao, { observe: 'response' });
  }

  getAlocacoes(): Observable<Alocacao[]> {
    return this.http.get<Alocacao[]>(this.apiUrl);
  }

  getCustoTotal(id: number): Observable<number> {
     return this.http.get(`${this.apiUrl}/custo/${id}`, { responseType: 'text' })
       .pipe(map(valor => parseFloat(valor.replace(',', '.')))); 
  }

  getCustoNoPeriodo(id: number, dataInicio: string, dataFim: string): Observable<string> {
    return this.http.get(
      `${this.apiUrl}/custo/${id}/${dataInicio}/${dataFim}`,
      { responseType: 'text' }
    );
  }
}
