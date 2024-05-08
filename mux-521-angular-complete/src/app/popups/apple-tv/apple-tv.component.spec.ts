import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppleTvComponent } from './apple-tv.component';

describe('AppleTvComponent', () => {
  let component: AppleTvComponent;
  let fixture: ComponentFixture<AppleTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppleTvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppleTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
