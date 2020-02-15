import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEventCardComponent } from './student-event-card.component';

describe('StudentEventCardComponent', () => {
  let component: StudentEventCardComponent;
  let fixture: ComponentFixture<StudentEventCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentEventCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
