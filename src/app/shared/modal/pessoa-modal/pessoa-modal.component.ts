import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreatePessoaDto, PessoaService } from '../../../services/pessoa-service';

@Component({
  selector: 'app-pessoa-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './pessoa-modal.html',
  styleUrl: './pessoa-modal.scss'
})
export class PessoaModalComponent {
  pessoaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private dialogRef: MatDialogRef<PessoaModalComponent>
  ) {
    this.pessoaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  fecharModal(): void {
    this.dialogRef.close();
  }

  salvarPessoa(): void {
    if (this.pessoaForm.valid) {
      const pessoa: CreatePessoaDto = {
        nome: this.pessoaForm.value.nome
      };

      this.pessoaService.create(pessoa).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Erro ao criar pessoa', err)
      });
    }
  }
}
