import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OPadExampleComponent } from './o-pad.component';

describe('OPadExampleComponent', () => {
  let component: OPadExampleComponent;
  let fixture: ComponentFixture<OPadExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OPadExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OPadExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
