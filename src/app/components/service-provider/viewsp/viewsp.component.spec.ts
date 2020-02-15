import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewspComponent } from './viewsp.component';

describe('ViewspComponent', () => {
  let component: ViewspComponent;
  let fixture: ComponentFixture<ViewspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewspComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
