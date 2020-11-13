import { Component, OnInit } from '@angular/core';
import { Books } from '../models/book';
import { BooksService } from '../service/book.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Publisher } from '../models/publisher';
import { Author } from '../models/author';
import { Cate } from '../models/cate';
import { AuthorService } from '../service/author.service';
import { CateService } from '../service/cate.service';
import { PublisherService } from '../service/publisher.service';
@Component({
  selector: 'app-book-author',
  templateUrl: './book-author.component.html',
  styleUrls: ['./book-author.component.css']
})
export class BookAuthorComponent implements OnInit {

  books: Books[];
  mySubscription: any;
  pubs: Publisher[];
  auts: Author[];
  cates1: Cate[];
  id1: string = this.route.snapshot.paramMap.get('id1');
  constructor(private BooksService: BooksService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private AuthorsService: AuthorService,
              private CateService: CateService,
              private publisherService: PublisherService) {
                this.router.routeReuseStrategy.shouldReuseRoute = function () {
                  return false;
                };
                this.mySubscription = this.router.events.subscribe((event) => {
                  if (event instanceof NavigationEnd) {
                    // Trick the Router into believing it's last link wasn't previously loaded
                    this.router.navigated = false;
                  }
                });
               }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
      }
  }
  async ngOnInit() {
    await this.getAllBookFromAuthorID();
    await this.getAllCate();
    await this.getAllAuthor();
    await this.getAllPub();
  }
  getAllPub() {
    this.publisherService.getPublishers().subscribe(res => this.pubs = res);
  }
  getAllAuthor() {
    this.AuthorsService.getAuthors().subscribe(res => this.auts = res);
  }
  getAllCate() {
    this.CateService.getCates().subscribe(res => this.cates1 = res);
  }

  async getAllBookFromAuthorID() {
    const id = this.route.snapshot.paramMap.get('id');
    await this.BooksService.getBooksFromAuthorID(id).toPromise().then(res => this.books = res);
  }
  refresh(): void {
    location.reload();
  }
  async add(){
    await alert('Thêm Thành Công');
  }
}
