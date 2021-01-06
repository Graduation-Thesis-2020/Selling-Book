import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatProductsComponent } from './admin-stat-products.component';

describe('AdminStatProductsComponent', () => {
  let component: AdminStatProductsComponent;
  let fixture: ComponentFixture<AdminStatProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStatProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStatProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
