import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillchartComponent } from './skillchart.component';

describe('SkillchartComponent', () => {
  let component: SkillchartComponent;
  let fixture: ComponentFixture<SkillchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
