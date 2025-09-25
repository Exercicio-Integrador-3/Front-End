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
  descricao: string;
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
export class ContratoComponent implements OnInit{
  displayedColumns: string[] = ['id', 'nome', 'funcao', 'dataInicio', 'dataFim', 'horasSemanais', 'salarioHora'];
  dataSource: Contrato[] = [];

  constructor(
    private dialog: MatDialog,
    private contratoService: ContratoService
  ) {}

  ngOnInit(): void {
    this.contratoService.getContratos().subscribe({
      next: (contrato) => this.dataSource = contrato,
      error: (err) => console.error('Erro ao buscar contratos', err)
    });
  }
 
  abrirModal() {
    this.dialog.open(ContratoModalComponent, {
      width: '600px',
      height: '635px',
      disableClose: false
    });
  }
}
