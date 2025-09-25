import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule, MatDateRangeInput } from '@angular/material/datepicker';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { FormsModule } from '@angular/forms'
import { MatFormField,  MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AlocacaoService } from '../../../services/alocacao-service';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-custo-geral-modal',
  imports: [MatDialogModule, FormsModule, MatDatepickerModule, 
            MatFormFieldModule, MatInputModule, MatFormField, 
            ReactiveFormsModule, MatButtonModule, CurrencyPipe ],
  templateUrl: './custo-geral-modal.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './custo-geral-modal.scss'
})
export class CustoGeralModalComponent implements OnInit{
  protected range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date |null>(null)
  }); 
  protected custoTotal : string = "";
  protected valorCalculado : string = "0";
  
  constructor(@Inject(MAT_DIALOG_DATA) protected data: any,
              private service : AlocacaoService,
              private ref : MatDialogRef<CustoGeralModalComponent>){}
  

  ngOnInit(): void {
    this.service.getCustoTotal(this.data.id).subscribe({
      next:(custo) => this.custoTotal = "" + custo.toString(),
      error: (err) =>console.error('Erro', err)
    });
    this.range.valueChanges.subscribe(val =>{
      if(val.start && val.end){
        this.calcularPorPeriodo(this.data.id, val.start, val.end);
      }
    })
  }

  calcularPorPeriodo(id : number,start : Date, end : Date){
    const startString :string = start.toISOString().split('T')[0];
    const endString :string = end.toISOString().split('T')[0];


    this.service.getCustoNoPeriodo(id, startString, endString).subscribe({
      next: (custo) => this.valorCalculado = "" + custo.toString(),
      error: (err) => console.error('Erro: ', err)
    });
  }

  clear(){
    this.range.reset({
      start: null,
      end: null
    });
    this.valorCalculado = "0";
  }

  closeModal(){
    this.ref.close();
  }
}
