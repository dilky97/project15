import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceproviderHomeComponent } from './serviceprovider-home.component';

describe('ServiceproviderHomeComponent', () => {
  let component: ServiceproviderHomeComponent;
  let fixture: ComponentFixture<ServiceproviderHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceproviderHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceproviderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
