import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlocacaoModal } from './alocacao-modal';

describe('AlocacaoModal', () => {
  let component: AlocacaoModal;
  let fixture: ComponentFixture<AlocacaoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlocacaoModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlocacaoModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
