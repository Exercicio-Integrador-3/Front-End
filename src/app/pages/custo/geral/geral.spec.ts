import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Geral } from './geral.component';

describe('Geral', () => {
  let component: Geral;
  let fixture: ComponentFixture<Geral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Geral]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Geral);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
