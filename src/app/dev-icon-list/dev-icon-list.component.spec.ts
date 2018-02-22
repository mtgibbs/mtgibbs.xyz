import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevIconListComponent } from './dev-icon-list.component';

describe('DevIconListComponent', () => {
  let component: DevIconListComponent;
  let fixture: ComponentFixture<DevIconListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevIconListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevIconListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
