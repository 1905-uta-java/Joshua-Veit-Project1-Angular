import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmailTabComponent } from './change-email-tab.component';

describe('ChangeEmailTabComponent', () => {
  let component: ChangeEmailTabComponent;
  let fixture: ComponentFixture<ChangeEmailTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeEmailTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeEmailTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
