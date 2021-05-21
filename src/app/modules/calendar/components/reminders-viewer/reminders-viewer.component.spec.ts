import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindersViewerComponent } from './reminders-viewer.component';

describe('RemindersViewerComponent', () => {
  let component: RemindersViewerComponent;
  let fixture: ComponentFixture<RemindersViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemindersViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindersViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
