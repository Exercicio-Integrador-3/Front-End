import { ComponentFixture, TestBed } from '@angular/core/testing';

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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
