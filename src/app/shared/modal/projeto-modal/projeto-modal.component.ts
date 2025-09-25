import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { ProjetoService, CreateProjetoDto } from '../../../services/projeto-service';

export const CUSTOM_DATE_FORMATS = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

@Component({
  selector: 'app-projeto-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ],
  templateUrl: './projeto-modal.html',
  styleUrl: './projeto-modal.scss'
})
export class ProjetoModalComponent {
  projetoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProjetoModalComponent>,
    private projetoService: ProjetoService
  ) {
    this.projetoForm = this.fb.group({
      nome: ['', Validators.required],
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
      descricao: ['', [Validators.required, Validators.maxLength(200)]],
    }, { validators: this.validarIntervaloDatas });
  }

  private validarIntervaloDatas(form: FormGroup) {
    const inicio = form.get('dataInicio')?.value;
    const fim = form.get('dataFim')?.value;
    if (inicio && fim && fim < inicio) {
      form.get('dataFim')?.setErrors({ dataInvalida: true });
    } else {
      if (form.get('dataFim')?.hasError('dataInvalida')) {
        form.get('dataFim')?.setErrors(null);
      }
    }
    return null;
  }

  salvarProjeto() {
    if (this.projetoForm.valid) {
      const novoProjeto: CreateProjetoDto = {
        nome: this.projetoForm.value.nome,
        dataInicio: this.formatarData(this.projetoForm.value.dataInicio),
        dataFim: this.formatarData(this.projetoForm.value.dataFim),
        descricao: this.projetoForm.value.descricao,
      };

      this.projetoService.createProjeto(novoProjeto).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Erro ao criar projeto', err)
      });
    } else {
      this.projetoForm.markAllAsTouched();
    }
  }

  fecharModal() {
    this.dialogRef.close(false);
  }

  private formatarData(data: Date): string {
    return data ? data.toISOString().split('T')[0] : '';
  }
}
