import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppleTvRemoteComponent } from './apple-tv-remote.component';

describe('AppleTvRemoteComponent', () => {
  let component: AppleTvRemoteComponent;
  let fixture: ComponentFixture<AppleTvRemoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppleTvRemoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppleTvRemoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
