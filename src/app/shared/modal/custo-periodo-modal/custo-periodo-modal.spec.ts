import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustoPeriodoModal } from './custo-periodo-modal.component';

describe('CustoPeriodoModal', () => {
  let component: CustoPeriodoModal;
  let fixture: ComponentFixture<CustoPeriodoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustoPeriodoModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustoPeriodoModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
