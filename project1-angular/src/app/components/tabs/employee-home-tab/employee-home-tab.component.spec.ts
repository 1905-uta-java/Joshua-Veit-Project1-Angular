import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeHomeTabComponent } from './employee-home-tab.component';

describe('EmployeeHomeTabComponent', () => {
  let component: EmployeeHomeTabComponent;
  let fixture: ComponentFixture<EmployeeHomeTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeHomeTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeHomeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
