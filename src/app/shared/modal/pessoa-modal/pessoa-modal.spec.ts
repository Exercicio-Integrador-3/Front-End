import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/shared/modal/pessoa-modal/pessoa-modal.spec.ts
import { PessoaModal } from './pessoa-modal.component';

describe('PessoaModal', () => {
  let component: PessoaModal;
  let fixture: ComponentFixture<PessoaModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoaModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoaModal);
========
import { CustoGeralModal } from './custo-geral-modal.component';

describe('CustoGeralModal', () => {
  let component: CustoGeralModal;
  let fixture: ComponentFixture<CustoGeralModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustoGeralModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustoGeralModal);
>>>>>>>> 522d32ebf88e6301ed22aeef10f6f0f2649685c0:src/app/shared/modal/custo-geral-modal/custo-geral-modal.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
