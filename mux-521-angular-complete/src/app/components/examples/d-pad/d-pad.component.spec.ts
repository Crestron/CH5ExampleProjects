import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DPadExampleComponent } from './d-pad.component';

describe('DPadExampleComponent', () => {
  let component: DPadExampleComponent;
  let fixture: ComponentFixture<DPadExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DPadExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DPadExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
