import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatProfitDayComponent } from './admin-stat-profit-day.component';

describe('AdminStatProfitDayComponent', () => {
  let component: AdminStatProfitDayComponent;
  let fixture: ComponentFixture<AdminStatProfitDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStatProfitDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStatProfitDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
