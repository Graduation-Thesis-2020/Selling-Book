import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/service/author.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/models/author';
import { Location } from '@angular/common';
@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnInit {

  author: Author;
  constructor(
    private route: ActivatedRoute,
    private AuthorService: AuthorService,
    private location: Location,) { }

  ngOnInit() {
    this.getAuthorFromRoute();
  }
  getAuthorFromRoute() {
    const id = this.route.snapshot.paramMap.get('id');
    this.AuthorService.getAuthorFromAuthorID(id).toPromise().then(res => this.author = res);
  }
  save() {
    this.AuthorService.editAuthor(this.author).subscribe();
    alert('Thành Công')
    this.goBack();
  }
  goBack(): void {
    this.location.back();
  }
}
