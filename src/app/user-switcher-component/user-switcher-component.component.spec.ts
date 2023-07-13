import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSwitcherComponentComponent } from './user-switcher-component.component';

describe('UserSwitcherComponentComponent', () => {
  let component: UserSwitcherComponentComponent;
  let fixture: ComponentFixture<UserSwitcherComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSwitcherComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSwitcherComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
