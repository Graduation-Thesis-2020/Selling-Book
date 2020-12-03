import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAllComponent } from './book-all.component';

describe('BookAllComponent', () => {
  let component: BookAllComponent;
  let fixture: ComponentFixture<BookAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
