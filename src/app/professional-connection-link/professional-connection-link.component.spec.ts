import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalConnectionLinkComponent } from './professional-connection-link.component';

describe('ProfessionalConnectionLinkComponent', () => {
  let component: ProfessionalConnectionLinkComponent;
  let fixture: ComponentFixture<ProfessionalConnectionLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalConnectionLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalConnectionLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
