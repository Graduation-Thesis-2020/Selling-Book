import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdminAccountComponent } from './admin-admin-account.component';

describe('AdminAdminAccountComponent', () => {
  let component: AdminAdminAccountComponent;
  let fixture: ComponentFixture<AdminAdminAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAdminAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdminAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
