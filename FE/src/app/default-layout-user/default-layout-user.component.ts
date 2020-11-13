import { Component, OnInit } from '@angular/core';
import { Author } from '../models/author';
import { Cate } from '../models/cate';
import { Publisher } from '../models/publisher';
import { AuthorService } from '../service/author.service';
import { BooksService } from '../service/book.service';
import { CateService } from '../service/cate.service';
import { PublisherService } from '../service/publisher.service';
import { Location } from '@angular/common';
import { Item } from '../models/cart';

@Component({
  selector: 'app-default-layout-user',
  templateUrl: './default-layout-user.component.html',
  styleUrls: ['./default-layout-user.component.css']
})
export class DefaultLayoutUserComponent implements OnInit {
  cates: Cate[];
  pubs: Publisher[];
  auts: Author[];
  items: Item[] = [];
  total: number;
  countItem: number;
  constructor(private BooksService: BooksService,private PubService: PublisherService,
    private CateService: CateService,private AuthorService: AuthorService,
    private location: Location, ) { }


    ngOnInit() {
        this.getAllCate();
        this.getAllPub();
        this.getAllAuthor();
        this.loadCart();
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
    loadCart() {
      this.total = 0;
      this.items = [];
      let cart: any = JSON.parse(localStorage.getItem("cart"));
      for (var i = 0; i < cart.length; i++) {
        let item: Item = JSON.parse(cart[i]);
        this.items.push({
          product: item.product,
          total: item.total,
        });
        this.total += item.product.price * item.total;
      }
      this.countItem = this.items.length;
    }
  }


