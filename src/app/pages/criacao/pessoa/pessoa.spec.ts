import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pessoa } from './pessoa.component';
import { CustoPeriodoModalComponent } from '../../../shared/modal/custo-periodo-modal/custo-periodo-modal.component';

describe('CustoPeriodoModalComponent', () => {
  let component: CustoPeriodoModalComponent;
  let fixture: ComponentFixture<CustoPeriodoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustoPeriodoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustoPeriodoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
