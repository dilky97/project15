import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlannerLayoutComponent } from './event-planner-layout.component';

describe('EventPlannerLayoutComponent', () => {
  let component: EventPlannerLayoutComponent;
  let fixture: ComponentFixture<EventPlannerLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPlannerLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPlannerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
