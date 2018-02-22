import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceItemListComponent } from './experience-item-list.component';

describe('ExperienceItemListComponent', () => {
  let component: ExperienceItemListComponent;
  let fixture: ComponentFixture<ExperienceItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
