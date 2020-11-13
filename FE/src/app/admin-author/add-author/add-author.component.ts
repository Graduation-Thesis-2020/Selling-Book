import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author';
import { AuthorService } from 'src/app/service/author.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  title = 'aaaa';
  author: Author;
  constructor(
    private AuthorService: AuthorService,
  ) {

  }

  ngOnInit() {
  }
  save(name: string, firstname: string, lastname: string ) {
    const newAuthor: Author = { name, firstname, lastname } as Author;
    this.AuthorService.addAuthor(newAuthor).subscribe(res => this.author = res);
    alert('Thêm Thành Công!');
  }
}
