import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRequestsTabComponent } from './employee-requests-tab.component';

describe('EmployeeRequestsTabComponent', () => {
  let component: EmployeeRequestsTabComponent;
  let fixture: ComponentFixture<EmployeeRequestsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeRequestsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRequestsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
