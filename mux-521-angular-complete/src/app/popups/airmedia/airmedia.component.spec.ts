import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirmediaComponent } from './airmedia.component';

describe('AirmediaComponent', () => {
  let component: AirmediaComponent;
  let fixture: ComponentFixture<AirmediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirmediaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AirmediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
