import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common'; // ✅ IMPORTA O PIPE
import { ProjetoModalComponent } from '../../../shared/modal/projeto-modal/projeto-modal.component';

export interface Projeto {
  id: number;
  nome: string;
  dataInicio: string;
  dataFim: string;
  descricao: string;
}

@Component({
  selector: 'app-projeto',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    DatePipe 
  ],
  templateUrl: './projeto.html',
  styleUrl: './projeto.scss'
})
export class ProjetoComponent {

  displayedColumns: string[] = ['id', 'nome', 'dataInicio', 'dataFim', 'descricao'];

  dataSource: Projeto[] = [
    {
      id: 1,
      nome: 'Projeto Alpha',
      dataInicio: '2025-01-10',
      dataFim: '2025-06-30',
      descricao: 'Sistema de gestão corporativa'
    },
    {
      id: 2,
      nome: 'Projeto Beta',
      dataInicio: '2025-02-15',
      dataFim: '2025-08-01',
      descricao: 'Aplicativo mobile para clientes'
    }
  ];

  constructor(private dialog: MatDialog) {}

  abrirModal() {
    this.dialog.open(ProjetoModalComponent, {
      width: '400px',
      disableClose: false
    });
  }
}
