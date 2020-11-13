import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPubComponent } from './book-pub.component';

describe('BookPubComponent', () => {
  let component: BookPubComponent;
  let fixture: ComponentFixture<BookPubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookPubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
