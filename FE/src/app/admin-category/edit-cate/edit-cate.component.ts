import { Component, OnInit } from '@angular/core';
import { Cate } from 'src/app/models/cate';
import { ActivatedRoute } from '@angular/router';
import { CateService } from 'src/app/service/cate.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-edit-cate',
  templateUrl: './edit-cate.component.html',
  styleUrls: ['./edit-cate.component.css']
})
export class EditCateComponent implements OnInit {

  cate: Cate;
  constructor(
    private route: ActivatedRoute,
    private CateService: CateService,
    private location: Location,) { }

  ngOnInit() {
    this.getCateFromRoute();
  }
  getCateFromRoute() {
    const id = this.route.snapshot.paramMap.get('id');
    this.CateService.getCateFromCateID(id).toPromise().then(res => this.cate = res);
  }
  save() {
    this.CateService.editCate(this.cate).subscribe();
    alert('Thành Công');
    this.goBack();
  }
  goBack(): void {
    this.location.back();
  }
}
