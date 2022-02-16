import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglemediauploadComponent } from './singlemediaupload.component';

describe('SinglemediauploadComponent', () => {
  let component: SinglemediauploadComponent;
  let fixture: ComponentFixture<SinglemediauploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglemediauploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglemediauploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
