import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherModalPopupComponent } from './weather-modal-popup.component';

describe('WeatherModalPopupComponent', () => {
  let component: WeatherModalPopupComponent;
  let fixture: ComponentFixture<WeatherModalPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherModalPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherModalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
