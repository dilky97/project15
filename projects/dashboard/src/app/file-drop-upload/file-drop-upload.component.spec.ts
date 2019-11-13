import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDropUploadComponent } from './file-drop-upload.component';

describe('FileDropUploadComponent', () => {
  let component: FileDropUploadComponent;
  let fixture: ComponentFixture<FileDropUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileDropUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDropUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
