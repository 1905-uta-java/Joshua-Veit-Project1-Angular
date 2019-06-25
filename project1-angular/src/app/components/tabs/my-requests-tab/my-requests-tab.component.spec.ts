import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRequestsTabComponent } from './my-requests-tab.component';

describe('MyRequestsTabComponent', () => {
  let component: MyRequestsTabComponent;
  let fixture: ComponentFixture<MyRequestsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRequestsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRequestsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
