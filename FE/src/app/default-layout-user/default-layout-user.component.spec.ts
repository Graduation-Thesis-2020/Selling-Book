import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultLayoutUserComponent } from './default-layout-user.component';

describe('DefaultLayoutUserComponent', () => {
  let component: DefaultLayoutUserComponent;
  let fixture: ComponentFixture<DefaultLayoutUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultLayoutUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultLayoutUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
