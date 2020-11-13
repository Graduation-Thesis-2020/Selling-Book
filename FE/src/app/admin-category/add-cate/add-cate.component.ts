import { Component, OnInit } from '@angular/core';
import { Cate } from 'src/app/models/cate';
import { CateService } from 'src/app/service/cate.service';

@Component({
  selector: 'app-add-cate',
  templateUrl: './add-cate.component.html',
  styleUrls: ['./add-cate.component.css']
})
export class AddCateComponent implements OnInit {

  cate: Cate;
  constructor(
    private CateService: CateService,
  ) {

  }

  ngOnInit() {
  }
  save(name: string) {
    const newCate: Cate = { name } as Cate;
    this.CateService.addCate(newCate).subscribe(res => this.cate = res);
    alert('Thêm Thành Công!');
  }
}
