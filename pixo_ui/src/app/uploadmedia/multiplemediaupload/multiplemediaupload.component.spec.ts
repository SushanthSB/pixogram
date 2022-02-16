import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplemediauploadComponent } from './multiplemediaupload.component';

describe('MultiplemediauploadComponent', () => {
  let component: MultiplemediauploadComponent;
  let fixture: ComponentFixture<MultiplemediauploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiplemediauploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplemediauploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
