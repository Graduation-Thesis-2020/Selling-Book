import { Component, OnInit } from '@angular/core';
import { Cate } from 'src/app/models/cate';
import { CateService } from 'src/app/service/cate.service';

@Component({
  selector: 'app-list-cate',
  templateUrl: './list-cate.component.html',
  styleUrls: ['./list-cate.component.css']
})
export class ListCateComponent implements OnInit {

  cates: Cate[];
  cate: Cate;
  config: any;

  constructor(private CateService: CateService) {
    this.config = {
    itemsPerPage: 15,
    currentPage: 1,
    };
  }

  pageChanged(event) {
  this.config.currentPage = event;
  }

  ngOnInit() {
    this.getAllCates();
  }

  getAllCates() {
    this.CateService.getCates().subscribe(res => this.cates = res);
  }
  delete(title, id) {
    const ans = confirm('Xóa thông tin thể loại: ' + title );
    if (ans) {
      this.CateService.delete(id).subscribe(() => {
        this.getAllCates();
      }, error => console.error(error));
    }
  }
}
