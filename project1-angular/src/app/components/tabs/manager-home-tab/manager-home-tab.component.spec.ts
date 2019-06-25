import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerHomeTabComponent } from './manager-home-tab.component';

describe('ManagerHomeTabComponent', () => {
  let component: ManagerHomeTabComponent;
  let fixture: ComponentFixture<ManagerHomeTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerHomeTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerHomeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
