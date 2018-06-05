import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivingTestComponent } from './driving-test.component';

describe('DrivingTestComponent', () => {
  let component: DrivingTestComponent;
  let fixture: ComponentFixture<DrivingTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrivingTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrivingTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
