import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NvxInfoComponent } from './nvx-info.component';

describe('NvxInfoComponent', () => {
  let component: NvxInfoComponent;
  let fixture: ComponentFixture<NvxInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NvxInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NvxInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
