import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OPadAltExampleComponent } from './o-pad-alt.component';

describe('OPadAltComponentExample', () => {
  let component: OPadAltExampleComponent;
  let fixture: ComponentFixture<OPadAltExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OPadAltExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OPadAltExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
