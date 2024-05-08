import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerConfirmComponent } from './power-confirm.component';

describe('PowerConfirmComponent', () => {
  let component: PowerConfirmComponent;
  let fixture: ComponentFixture<PowerConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PowerConfirmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PowerConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
