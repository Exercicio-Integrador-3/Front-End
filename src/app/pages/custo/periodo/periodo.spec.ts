import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Periodo } from './periodo.component';

describe('Periodo', () => {
  let component: Periodo;
  let fixture: ComponentFixture<Periodo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Periodo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Periodo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
