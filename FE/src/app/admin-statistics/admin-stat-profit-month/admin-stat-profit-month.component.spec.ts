import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatProfitMonthComponent } from './admin-stat-profit-month.component';

describe('AdminStatProfitMonthComponent', () => {
  let component: AdminStatProfitMonthComponent;
  let fixture: ComponentFixture<AdminStatProfitMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStatProfitMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStatProfitMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
