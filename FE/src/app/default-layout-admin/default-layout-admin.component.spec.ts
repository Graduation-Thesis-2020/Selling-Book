import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultLayoutAdminComponent } from './default-layout-admin.component';

describe('DefaultLayoutAdminComponent', () => {
  let component: DefaultLayoutAdminComponent;
  let fixture: ComponentFixture<DefaultLayoutAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultLayoutAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultLayoutAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
