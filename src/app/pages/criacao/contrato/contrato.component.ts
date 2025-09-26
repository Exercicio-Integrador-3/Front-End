import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ContratoModalComponent } from '../../../shared/modal/contrato-modal/contrato-modal.component';
import { ContratoService } from '../../../services/contrato-service';

export interface Contrato {
  Id: number;
  nome: string;
  funcao: string;
  dataInicio: string;
  dataFim: string;
  horasSemanais: number;
  salarioHora: number;
  nomePessoa: string;
}

@Component({
  selector: 'app-contrato',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './contrato.html',
  styleUrl: './contrato.scss'
})
export class ContratoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'funcao', 'dataInicio', 'dataFim', 'horasSemanais', 'salarioHora'];
  dataSource: Contrato[] = [];

  constructor(
    private dialog: MatDialog,
    private contratoService: ContratoService
  ) {}

  ngOnInit(): void {
    this.carregarContratos();
  }

  carregarContratos() {
    this.contratoService.getContratos().subscribe({
      next: (contratos) => this.dataSource = contratos,
      error: (err) => console.error('Erro ao buscar contratos', err)
    });
  }

  abrirModal() {
    const dialogRef = this.dialog.open(ContratoModalComponent, {
      width: '600px',
      height: '490px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((criado) => {
      if (criado) {
        this.carregarContratos();
      }
    });
  }
}
