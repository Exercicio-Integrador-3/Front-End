import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ContratoService, CreateContratoDto } from '../../../services/contrato-service';
import { PessoaService, Pessoa } from '../../../services/pessoa-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contrato-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule
  ],
  templateUrl: './contrato-modal.html',
  styleUrl: './contrato-modal.scss'
})
export class ContratoModalComponent implements OnInit {
  contratoForm: FormGroup;
  pessoas: Pessoa[] = []; 
  minDate = new Date();

  perfis = [
    { id: 1, nome: 'Gerente' },
    { id: 2, nome: 'DEV' },
    { id: 3, nome: 'QA' },
    { id: 4, nome: 'Security' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ContratoModalComponent>,
    private contratoService: ContratoService,
    private pessoaService: PessoaService
  ) {
    this.contratoForm = this.fb.group({
      pessoaId: [null, Validators.required],
      perfilId: [null, Validators.required],
      dataInicio: [null, Validators.required],
      dataFim: [null, Validators.required],
      horasSemanais: [
        null,
        [Validators.required, Validators.min(1), Validators.max(40)]
      ],
      salarioHora: [
        null,
        [Validators.required, Validators.min(0.01)]
      ]
    }, { validators: this.validarDatas });
  }

  ngOnInit(): void {
    this.carregarPessoas();

    this.contratoForm.get('horasSemanais')?.valueChanges.subscribe(value => {
      if (value !== null && value !== undefined) {
        const cleaned = value.toString().replace(/^0+(?=\d)/, ''); 
        if (cleaned !== value.toString()) {
          this.contratoForm.get('horasSemanais')?.setValue(cleaned, { emitEvent: false });
        }
      }
    });

    this.contratoForm.get('salarioHora')?.valueChanges.subscribe(value => {
      if (value !== null && value !== undefined) {
        const cleaned = value.toString().replace(/^0+(?=\d)/, ''); 
        if (cleaned !== value.toString()) {
          this.contratoForm.get('salarioHora')?.setValue(cleaned, { emitEvent: false });
        }
      }
    });
  }

  carregarPessoas() {
    this.pessoaService.getAll().subscribe({
      next: (pessoas) => this.pessoas = pessoas,
      error: (err) => console.error('Erro ao carregar pessoas', err)
    });
  }

  validarDatas(group: FormGroup) {
    const inicio = group.get('dataInicio')?.value;
    const fim = group.get('dataFim')?.value;

    if (inicio && fim) {
      const inicioDate = new Date(inicio);
      const fimDate = new Date(fim);

      if (fimDate <= inicioDate) {
        group.get('dataFim')?.setErrors({ dataInvalida: true });
      } else {
        if (group.get('dataFim')?.hasError('dataInvalida')) {
          group.get('dataFim')?.setErrors(null);
        }
      }
    }
    return null;
  }

  salvarContrato() {
    if (this.contratoForm.valid) {
      const novoContrato: CreateContratoDto = {
        pessoaId: this.contratoForm.value.pessoaId,
        perfilId: this.contratoForm.value.perfilId,
        dataInicio: this.formatarData(this.contratoForm.value.dataInicio),
        dataFim: this.formatarData(this.contratoForm.value.dataFim),
        horasSemanais: Number(this.contratoForm.value.horasSemanais),
        salarioHora: Number(this.contratoForm.value.salarioHora),
      }
      this.contratoService.createContrato(novoContrato).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Erro ao salvar contrato', err)
      });
    }
  }

  fecharModal() {
    this.dialogRef.close(false);
  }

  private formatarData(data: Date): string {
    return data ? data.toISOString().split('T')[0] : '';
  }
}
