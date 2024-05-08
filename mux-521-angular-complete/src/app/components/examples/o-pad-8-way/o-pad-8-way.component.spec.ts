import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OPad8WayExampleComponent } from './o-pad-8-way.component';

describe('OPad8WayExampleComponent', () => {
  let component: OPad8WayExampleComponent;
  let fixture: ComponentFixture<OPad8WayExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OPad8WayExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OPad8WayExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
