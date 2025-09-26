import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ContratoService, CreateContratoDto } from '../../../services/contrato-service';
import { PessoaService } from '../../../services/pessoa-service';
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
  pessoasIds: number[] = []; 

  perfis = [
  { id: 1, nome: 'Gerente' },
  { id: 2, nome: 'DEV' },
  { id: 3, nome: 'QA' },
  { id: 4, nome: 'Security' }
  ];;

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
      dataFim: [null],
      descricao: ['', [Validators.required, Validators.maxLength(200)]],
      horasSemanais: [null, Validators.required],
      salarioHora: [null, Validators.required]
    }, { validators: this.validarDatas });
  }

  ngOnInit(): void {
    this.carregarPessoasIds();
  }

  carregarPessoasIds() {
    this.pessoaService.getAllIds().subscribe({
      next: (ids) => this.pessoasIds = ids,
      error: (err) => console.error('Erro ao carregar IDs de pessoas', err)
    });
  }

  validarDatas(group: FormGroup) {
    const inicio = group.get('dataInicio')?.value;
    const fim = group.get('dataFim')?.value;
    if (inicio && fim && new Date(fim) < new Date(inicio)) {
      group.get('dataFim')?.setErrors({ dataInvalida: true });
    } else {
      if (group.get('dataFim')?.hasError('dataInvalida')) {
        group.get('dataFim')?.setErrors(null);
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
        descricao: this.contratoForm.value.descricao,
        horasSemanais: this.contratoForm.value.horasSemanais,
        salarioHora: this.contratoForm.value.salarioHora,
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
