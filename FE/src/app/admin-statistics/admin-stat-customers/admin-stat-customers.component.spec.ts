import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatCustomersComponent } from './admin-stat-customers.component';

describe('AdminStatCustomersComponent', () => {
  let component: AdminStatCustomersComponent;
  let fixture: ComponentFixture<AdminStatCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStatCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStatCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
