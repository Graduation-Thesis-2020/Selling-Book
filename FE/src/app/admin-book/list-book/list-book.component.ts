import { Component, OnInit } from '@angular/core';
import { Books } from 'src/app/models/book';
import { BooksService } from 'src/app/service/book.service';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {
  books: Books[];
  title = 'A';
  config: any;

  constructor(private BooksService: BooksService) {
    this.config = {
    itemsPerPage: 10,
    currentPage: 1
    };
  }

  pageChanged(event) {
  this.config.currentPage = event;
  }
  ngOnInit() {
    this.getAllBook();
  }

  getAllBook() {
    this.BooksService.getBooks().subscribe(res => this.books = res);
  }
  delete(title, id) {
    const ans = confirm('Xóa thông tin sách: ' + title );
    if (ans) {
      this.BooksService.delete(id).subscribe(() => {
        this.getAllBook();
      }, error => console.error(error));
    }
  }
}
