import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule,provideNativeDateAdapter } from '@angular/material/core';
import { Cargo } from '../model/cargo';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-contrato',
  imports: [ReactiveFormsModule, MatFormField, MatLabel,
    MatSelect, MatOption, MatDatepickerModule, MatNativeDateModule, MatInputModule,
    MatFormFieldModule, MatButtonModule],
  templateUrl: './contrato.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './contrato.scss'
})
export class Contrato {
  //apenas para mock
  protected idsPessoas: number[] = [1,2,3,4,5,6];
  protected idPerfis : Cargo[] = Object.values(Cargo).filter(key=>isNaN(Number(key)));
 
  protected form = new FormGroup({
    idPessoa : new FormControl<Number | null>(null, {
      validators: [Validators.required]
    }),
    idPerfil : new FormControl<Number | null>(null, {
      validators: [Validators.required]
    }),
    dataInicio : new FormControl<Date | null>(null,{
      validators: [Validators.required]
    }),
    dataFim : new FormControl<Date | null>(null,{
      validators: [Validators.required]
    }),
    horaSem: new FormControl<Number | null>(null,{
      validators: [Validators.required]
    }),
    salarioPorHora : new FormControl<Number | null>(null,{
      validators: [Validators.required]
    })
  });

  onSubmit(){

  }

}
