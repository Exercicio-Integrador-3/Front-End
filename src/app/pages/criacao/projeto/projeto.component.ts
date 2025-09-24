import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { ProjetoModalComponent } from '../../../shared/modal/projeto-modal/projeto-modal.component';
import { Projeto, ProjetoService } from '../../../services/projeto-service';
import { CustoGeralModalComponent } from '../../../shared/modal/custo-geral-modal/custo-geral-modal.component';

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
export class ProjetoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'dataInicio', 'dataFim', 'descricao','acoes'];

  dataSource: Projeto[] = [];

  constructor(
    private dialog: MatDialog,
    private projetoService: ProjetoService
  ) {}

  ngOnInit(): void {
    this.projetoService.getProjetos().subscribe({
      next: (projetos) => this.dataSource = projetos,
      error: (err) => console.error('Erro ao buscar projetos', err)
    });
  }

  abrirModal() {
  const dialogRef = this.dialog.open(ProjetoModalComponent, {
    width: '500px',
    disableClose: false,    
  });

  dialogRef.afterClosed().subscribe((criado) => {
    if (criado) {
      this.projetoService.getProjetos().subscribe({
        next: (projetos) => this.dataSource = projetos
      });
    }
  });
}

}
