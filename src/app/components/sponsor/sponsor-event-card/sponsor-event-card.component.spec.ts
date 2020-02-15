import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorEventCardComponent } from './sponsor-event-card.component';

describe('SponsorEventCardComponent', () => {
  let component: SponsorEventCardComponent;
  let fixture: ComponentFixture<SponsorEventCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorEventCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
