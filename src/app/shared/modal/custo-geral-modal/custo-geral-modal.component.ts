import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule, MatDateRangeInput } from '@angular/material/datepicker';
import { FormControl, FormGroup} from '@angular/forms';
import { FormsModule } from '@angular/forms'
import { MatFormField,  MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AlocacaoService } from '../../../services/alocacao-service';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-custo-geral-modal',
  imports: [MatDialogModule, MatDateRangeInput, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatFormField, ReactiveFormsModule, MatButtonModule],
  templateUrl: './custo-geral-modal.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './custo-geral-modal.scss'
})
export class CustoGeralModalComponent implements OnInit{
  protected range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date |null>(null)
  }); 
  protected custoTotal : string | undefined;
  
  constructor(@Inject(MAT_DIALOG_DATA) protected data: any,private service : AlocacaoService){}
  

  ngOnInit(): void {
    this.service.getCustoTotal(this.data.id).subscribe({
      next:(custo) => this.custoTotal = "" + custo.toString(),
      error: (err) =>console.error('Erro', err)
    });
  }

}
