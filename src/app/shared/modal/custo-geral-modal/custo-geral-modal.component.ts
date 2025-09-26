import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { AlocacaoService } from '../../../services/alocacao-service';
import { ProjetoService, Projeto } from '../../../services/projeto-service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-custo-geral-modal',
  imports: [
    MatDialogModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    CurrencyPipe,
    CommonModule
  ],
  templateUrl: './custo-geral-modal.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './custo-geral-modal.scss'
})
export class CustoGeralModalComponent implements OnInit {
  protected range = new FormGroup({
    start: new FormControl<Date | null>(null, Validators.required),
    end: new FormControl<Date | null>(null, Validators.required)
  });

  protected custoTotal: number = 0;
  protected valorCalculado: number = 0;

  minDate!: Date;
  maxDate!: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: any,
    private service: AlocacaoService,
    private projetoService: ProjetoService,
    private ref: MatDialogRef<CustoGeralModalComponent>
  ) {}

  ngOnInit(): void {
    this.projetoService.getProjetoById(this.data.id).subscribe({
      next: (projeto: Projeto | null) => {
        if (projeto) {

          this.minDate = this.parseDateWithoutTimezone(projeto.dataInicio);
          this.maxDate = this.parseDateWithoutTimezone(projeto.dataFim);

          this.range.valueChanges.subscribe((val) => {
            const start = val.start;
            const end = val.end;

            if (start && (start < this.minDate || start > this.maxDate)) {
              this.range.get('start')?.setErrors({ foraDoIntervalo: true });
            }
            if (end && (end < this.minDate || end > this.maxDate)) {
              this.range.get('end')?.setErrors({ foraDoIntervalo: true });
            }

            if (start && end && !this.range.invalid) {
              this.calcularPorPeriodo(this.data.id, start, end);
            }
          });
        }
      },
      error: (err) => console.error('Erro ao buscar projeto:', err)
    });

    this.service.getCustoTotal(this.data.id).subscribe({
      next: (custo) => (this.custoTotal = custo),
      error: (err) => console.error('Erro', err)
    });
  }

  private parseDateWithoutTimezone(dateStr: string): Date {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  calcularPorPeriodo(id: number, start: Date, end: Date) {
    const startString: string = start.toISOString().split('T')[0];
    const endString: string = end.toISOString().split('T')[0];

    this.service.getCustoNoPeriodo(id, startString, endString).subscribe({
      next: (custo) => (this.valorCalculado = custo),
      error: (err) => console.error('Erro: ', err)
    });
  }

  clear() {
    this.range.reset({
      start: null,
      end: null
    });
    this.valorCalculado = 0;
  }

  closeModal() {
    this.ref.close();
  }
}
