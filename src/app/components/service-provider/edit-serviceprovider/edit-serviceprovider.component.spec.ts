import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceproviderComponent } from './edit-serviceprovider.component';

describe('EditServiceproviderComponent', () => {
  let component: EditServiceproviderComponent;
  let fixture: ComponentFixture<EditServiceproviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditServiceproviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditServiceproviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
