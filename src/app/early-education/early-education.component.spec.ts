import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarlyEducationComponent } from './early-education.component';

describe('EarlyEducationComponent', () => {
  let component: EarlyEducationComponent;
  let fixture: ComponentFixture<EarlyEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarlyEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarlyEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
