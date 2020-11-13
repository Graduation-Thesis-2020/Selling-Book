import { Component } from '@angular/core';
import { BooksService } from './service/book.service';
import { CateService } from './service/cate.service';
import { Cate } from './models/cate';
import { Location } from '@angular/common';
import { PublisherService } from './service/publisher.service';
import { Publisher } from './models/publisher';
import { AuthorService } from './service/author.service';
import { Author } from './models/author';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'Book Store';
  cates: Cate[];
  pubs: Publisher[];
  auts: Author[];
  constructor(private BooksService: BooksService,private PubService: PublisherService,
              private CateService: CateService,private AuthorService: AuthorService,
              private location: Location, ) { }

  ngOnInit() {
      this.getAllCate();
      this.getAllPub();
      this.getAllAuthor();
    }

  getAllCate() {
    this.CateService.getCates().subscribe(res => this.cates = res);
  }
  getAllPub() {
    this.PubService.getPublishers().subscribe(res => this.pubs = res);
  }
  getAllAuthor() {
    this.AuthorService.getAuthors().subscribe(res => this.auts = res);
  }
  refresh(): void {
    window.location.reload();
  }
}
