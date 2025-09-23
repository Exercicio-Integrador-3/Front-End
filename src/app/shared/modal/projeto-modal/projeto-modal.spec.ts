import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoModal } from './projeto-modal.component';

describe('ProjetoModal', () => {
  let component: ProjetoModal;
  let fixture: ComponentFixture<ProjetoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetoModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetoModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
