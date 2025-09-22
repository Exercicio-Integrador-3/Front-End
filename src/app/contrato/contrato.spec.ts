import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contrato } from './contrato';

describe('Contrato', () => {
  let component: Contrato;
  let fixture: ComponentFixture<Contrato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contrato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Contrato);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
