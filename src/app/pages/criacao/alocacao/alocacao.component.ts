import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AlocacaoService } from '../../../services/alocacao-service';
import { AlocacaoModalComponent } from '../../../shared/modal/alocacao-modal/alocacao-modal.component';

export interface Alocacao{
  idPessoa: number,
  idProjeto: number,
  quantidadeHoras: number
}

@Component({
  selector: 'app-alocacao',
  imports: [
    MatDialogModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './alocacao.html',
  styleUrl: './alocacao.scss',
  standalone: true,
})
export class AlocacaoComponent implements OnInit{

  displayedColumns: string[] = ['idPessoa', 'idProjeto', 'quantidadeHoras'];

  dataSource: Alocacao[] = [];

  constructor(
    private dialog: MatDialog,
    private alocacaoService: AlocacaoService
  ) {}

  ngOnInit(): void {
    this.alocacaoService.getAlocacoes().subscribe({
      next: (alocacaoes) => this.dataSource = alocacaoes,
      error: (err) => console.error('Erro ao buscar alocacoes', err)
    });
  }

  abrirModal() {
    this.dialog.open(AlocacaoModalComponent, {
      width: '400px',
      disableClose: false
    });
  }

}
