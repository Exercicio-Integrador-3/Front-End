import { ComponentFixture, TestBed } from '@angular/core/testing';

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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
