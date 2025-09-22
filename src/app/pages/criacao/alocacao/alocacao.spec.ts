import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Alocacao } from './alocacao.component';

describe('Alocacao', () => {
  let component: Alocacao;
  let fixture: ComponentFixture<Alocacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Alocacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Alocacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
