import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/service/book.service';
import { Books } from '../models/book';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {
  comingsoon: Books[];
  constructor(private BooksService: BooksService) { }

  ngOnInit() {
    this.getAllBookComingSoon();
  }
  getAllBookComingSoon() {
    this.BooksService.getBooksComingSoon().subscribe(res => this.comingsoon = res);
  }
}
