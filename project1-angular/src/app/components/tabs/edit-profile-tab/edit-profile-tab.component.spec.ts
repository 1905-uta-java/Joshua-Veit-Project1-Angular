import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileTabComponent } from './edit-profile-tab.component';

describe('EditProfileTabComponent', () => {
  let component: EditProfileTabComponent;
  let fixture: ComponentFixture<EditProfileTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
