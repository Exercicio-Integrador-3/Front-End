import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoModal } from './contrato-modal';

describe('ContratoModal', () => {
  let component: ContratoModal;
  let fixture: ComponentFixture<ContratoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratoModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratoModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
