import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DatePipe, CurrencyPipe } from '@angular/common'; // ✅ IMPORTA OS PIPES
import { ContratoModalComponent } from '../../../shared/modal/contrato-modal/contrato-modal.component';

export interface Contrato {
  id: number;
  pessoaId: number;
  perfilId: number;
  dataInicio: string;
  dataFim: string;
  horasSemanais: number;
  salarioHora: number;
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
export class ContratoComponent {

  displayedColumns: string[] = ['id', 'pessoaId', 'perfilId', 'dataInicio', 'dataFim', 'horasSemanais', 'salarioHora'];

  dataSource: Contrato[] = [
    {
      id: 1,
      pessoaId: 101,
      perfilId: 2001,
      dataInicio: '2025-01-10',
      dataFim: '2025-06-30',
      horasSemanais: 40,
      salarioHora: 50.75
    },
    {
      id: 2,
      pessoaId: 102,
      perfilId: 2002,
      dataInicio: '2025-02-15',
      dataFim: '2025-12-31',
      horasSemanais: 30,
      salarioHora: 65.0
    }
  ];

  constructor(private dialog: MatDialog) {}

  abrirModal() {
    this.dialog.open(ContratoModalComponent, {
      width: '400px',
      disableClose: false
    });
  }
}
