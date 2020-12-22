import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeeAccountComponent } from './admin-employee-account.component';

describe('AdminEmployeeAccountComponent', () => {
  let component: AdminEmployeeAccountComponent;
  let fixture: ComponentFixture<AdminEmployeeAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEmployeeAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmployeeAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
