import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AlocacaoService } from '../../../services/alocacao-service';
import { AlocacaoModalComponent } from '../../../shared/modal/alocacao-modal/alocacao-modal.component';

export interface Alocacao {
  nome: string;
  funcao: string;
  idPerfilPessoa: number;
  idProjeto: number;
  nomeProjeto: string;
  quantidadeHoras: number;
}

@Component({
  selector: 'app-alocacao',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './alocacao.html',
  styleUrl: './alocacao.scss',
})
export class AlocacaoComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'funcao', 'nomeProjeto', 'quantidadeHoras'];
  dataSource: Alocacao[] = [];

  constructor(
    private dialog: MatDialog,
    private alocacaoService: AlocacaoService
  ) {}

  ngOnInit(): void {
    this.getAlocacoes();
  }

  getAlocacoes(): void {
    this.alocacaoService.getAlocacoes().subscribe({
      next: (alocacoes) => this.dataSource = alocacoes,
      error: (err) => console.error('Erro ao buscar alocações', err)
    });
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(AlocacaoModalComponent, {
      width: '600px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAlocacoes();
      }
    });
  }
}
