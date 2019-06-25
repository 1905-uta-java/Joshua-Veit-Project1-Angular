import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEmployeeRequestsTabComponent } from './all-employee-requests-tab.component';

describe('AllEmployeeRequestsTabComponent', () => {
  let component: AllEmployeeRequestsTabComponent;
  let fixture: ComponentFixture<AllEmployeeRequestsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllEmployeeRequestsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEmployeeRequestsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
