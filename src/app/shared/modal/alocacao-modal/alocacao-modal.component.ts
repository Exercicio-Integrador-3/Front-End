import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { AlocacaoService, CreateAlocacaoDto } from '../../../services/alocacao-service';
import { PessoaService, Pessoa } from '../../../services/pessoa-service';
import { ProjetoService, Projeto } from '../../../services/projeto-service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-alocacao-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './alocacao-modal.html',
  styleUrl: './alocacao-modal.scss'
})
export class AlocacaoModalComponent implements OnInit {
  alocacaoForm: FormGroup;
  pessoas: Pessoa[] = [];
  projetos: Projeto[] = [];
  erroApi: string | null = null;

  perfis = [
    { id: 1, nome: 'Gerente' },
    { id: 2, nome: 'DEV' },
    { id: 3, nome: 'QA' },
    { id: 4, nome: 'Security' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AlocacaoModalComponent>,
    private alocacaoService: AlocacaoService,
    private pessoaService: PessoaService,
    private projetoService: ProjetoService
  ) {
    this.alocacaoForm = this.fb.group({
      idProjeto: [null, Validators.required],
      quantidadeHoras: [
        null,
        [Validators.required, Validators.min(1)]
      ],
      pessoasArray: this.fb.array([this.criarPessoaGrupo()])
    }, { validators: this.validarPessoasDuplicadas });
  }

  ngOnInit(): void {
    this.carregarPessoas();
    this.carregarProjetos();

    this.alocacaoForm.get('quantidadeHoras')?.valueChanges.subscribe(value => {
      if (value !== null && value !== undefined) {
        let cleaned = value.toString().replace(/[^0-9]/g, '');
        cleaned = cleaned.replace(/^0+(?=\d)/, ''); 
        if (cleaned !== value.toString()) {
          this.alocacaoForm.get('quantidadeHoras')?.setValue(cleaned, { emitEvent: false });
        }
      }
    });
  }

  get pessoasArray(): FormArray {
    return this.alocacaoForm.get('pessoasArray') as FormArray;
  }

  criarPessoaGrupo(): FormGroup {
    return this.fb.group({
      idPessoa: [null, Validators.required],
      idPerfil: [null, Validators.required]
    });
  }

  adicionarPessoa(): void {
    this.pessoasArray.push(this.criarPessoaGrupo());
  }

  removerPessoa(index: number): void {
    if (this.pessoasArray.length > 1) {
      this.pessoasArray.removeAt(index);
      this.alocacaoForm.updateValueAndValidity();
    }
  }

  carregarPessoas() {
    this.pessoaService.getAll().subscribe({
      next: (pessoas) => (this.pessoas = pessoas),
      error: (err) => console.error('Erro ao carregar pessoas', err)
    });
  }

  carregarProjetos() {
    this.projetoService.getProjetos().subscribe({
      next: (projetos) => (this.projetos = projetos),
      error: (err) => console.error('Erro ao carregar projetos', err)
    });
  }

  validarPessoasDuplicadas(control: AbstractControl) {
    const formArray = (control.get('pessoasArray') as FormArray);
    if (!formArray) return null;

    const idsSelecionados = formArray.controls.map(c => c.get('idPessoa')?.value).filter(v => v != null);
    const duplicados = idsSelecionados.filter((id, index) => idsSelecionados.indexOf(id) !== index);

    return duplicados.length > 0 ? { pessoasDuplicadas: true } : null;
  }

  salvarAlocacao() {
    if (this.alocacaoForm.valid) {
      this.erroApi = null;

      const idsPessoas = this.pessoasArray.controls.map(c => c.get('idPessoa')?.value);
      const idsPerfil = this.pessoasArray.controls.map(c => c.get('idPerfil')?.value);

      const payload: CreateAlocacaoDto = {
        idProjeto: this.alocacaoForm.value.idProjeto,
        quantidadeHoras: Number(this.alocacaoForm.value.quantidadeHoras),
        idsPessoas,
        idsPerfil
      };

      this.alocacaoService.createAlocacao(payload).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => {
          if (err.status === 400) {
            this.erroApi = 'Cargo já alocado';
          } else {
            console.error('Erro ao salvar alocação', err);
            this.erroApi = 'Erro inesperado ao salvar alocação';
          }
        }
      });
    }
  }

  fecharModal() {
    this.dialogRef.close(false);
  }
}
