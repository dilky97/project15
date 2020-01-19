import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlannerHomeComponent } from './event-planner-home.component';

describe('EventPlannerHomeComponent', () => {
  let component: EventPlannerHomeComponent;
  let fixture: ComponentFixture<EventPlannerHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPlannerHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPlannerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
