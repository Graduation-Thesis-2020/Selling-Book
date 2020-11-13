import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPubComponent } from './list-pub.component';

describe('ListPubComponent', () => {
  let component: ListPubComponent;
  let fixture: ComponentFixture<ListPubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
