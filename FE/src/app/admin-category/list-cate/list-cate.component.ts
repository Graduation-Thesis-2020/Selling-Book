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
     this.CateService.getCates().subscribe(cates => {this.cates = cates, this.cate = this.cates[0]});
  }
  delete(id) {
    this.CateService.delete(id).subscribe(() => this.getAllCates());
  }

  save(name: string) {
    //const newCate: Cate = { name } as Cate;
    //console.log(newCate);
    this.CateService.addCate( { name } as Cate).subscribe(() => this.getAllCates());
  }
  Edit() {
    //const newCate: Cate = {_id, name } as Cate;
    this.CateService.editCate(this.cate).subscribe(() => this.getAllCates());
  }
  getCat(_id){
    this.CateService.getCateFromCateID(_id).subscribe(res => this.cate = res);
  }
}
