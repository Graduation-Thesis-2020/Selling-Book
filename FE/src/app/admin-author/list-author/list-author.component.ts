import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author';
import { AuthorService } from 'src/app/service/author.service';

@Component({
  selector: 'app-list-author',
  templateUrl: './list-author.component.html',
  styleUrls: ['./list-author.component.css']
})
export class ListAuthorComponent implements OnInit {
  authors: Author[];
  title = 'A';
  config: any;

  constructor(private AuthorService: AuthorService) {
    this.config = {
    itemsPerPage: 10,
    currentPage: 1
    };
  }

  pageChanged(event) {
  this.config.currentPage = event;
  }

  ngOnInit() {
    this.getAllAuthor();
  }

  getAllAuthor() {
    this.AuthorService.getAuthors().subscribe(res =>this.authors = res);
  }
  delete(title, id) {
    const ans = confirm('Xóa thông tin tác giả: ' + title );
    if (ans) {
      this.AuthorService.delete(id).subscribe(() => {
        this.getAllAuthor();
      }, error => console.error(error));
    }
  }
}
