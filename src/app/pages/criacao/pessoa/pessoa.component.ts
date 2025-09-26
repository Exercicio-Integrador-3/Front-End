import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { PessoaService } from '../../../services/pessoa-service';
import { PessoaModalComponent } from '../../../shared/modal/pessoa-modal/pessoa-modal.component';

export interface Pessoa {
  id: number;
  nome: string; 
}

@Component({
  selector: 'app-pessoa',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './pessoa.html',
  styleUrl: './pessoa.scss'
})
export class PessoaComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome'];
  dataSource: Pessoa[] = [];

  constructor(
    private dialog: MatDialog,
    private pessoaService: PessoaService
  ) {}

  ngOnInit(): void {
    this.carregarPessoas();
  }

  carregarPessoas() {
    this.pessoaService.getAll().subscribe({
      next: (pessoas) => this.dataSource = pessoas,
      error: (err) => console.error('Erro ao buscar pessoas', err)
    });
  }

  abrirModal() {
    const dialogRef = this.dialog.open(PessoaModalComponent, {
      width: '600px',
      height: '300px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((criado) => {
      if (criado) {
        this.carregarPessoas(); 
      }
    });
  }
}
