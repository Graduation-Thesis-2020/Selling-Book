import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatProfitYearComponent } from './admin-stat-profit-year.component';

describe('AdminStatProfitYearComponent', () => {
  let component: AdminStatProfitYearComponent;
  let fixture: ComponentFixture<AdminStatProfitYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStatProfitYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStatProfitYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
