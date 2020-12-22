import { Component, OnInit } from '@angular/core';
import { Cate } from 'src/app/models/cate';
import { CateService } from 'src/app/service/cate.service';
import {MatSnackBar, MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { error } from 'protractor';
@Component({
  selector: 'app-list-cate',
  templateUrl: './list-cate.component.html',
  styleUrls: ['./list-cate.component.css']
})
export class ListCateComponent implements OnInit {

  cates: Cate[];
  cate: Cate;
  config: any;
  mess: any;
  messError: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private CateService: CateService, private _snackBar: MatSnackBar,) {
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
    this.CateService.delete(id).subscribe(() => {this.getAllCates();
      this._snackBar.open("Xóa thành công","Đóng", {
        panelClass: "snackbarConfig1",
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
  });
  }

  save(name: string) {
    //const newCate: Cate = { name } as Cate;
    //console.log(newCate);
    this.CateService.addCate( { name } as Cate).subscribe(() => {this.getAllCates();
      this._snackBar.open("Thêm thành công","Đóng", {
        panelClass: "snackbarConfig1",
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }, error => {
      this._snackBar.open("Thêm thất bại","Đóng", {
        panelClass: "snackbarErrorConfig",
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });
  }
  Edit() {
    //const newCate: Cate = {_id, name } as Cate;
    this.CateService.editCate(this.cate).subscribe(() => {this.getAllCates();
      this._snackBar.open("Chỉnh sửa thành công","Đóng", {
        panelClass: "snackbarConfig1",
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });});
  }
  getCat(_id){
    this.CateService.getCateFromCateID(_id).subscribe(res => this.cate = res);
  }
  search(title: string){
    this.CateService.searchCateAdmin(title).subscribe(res => this.cates = res,
      error => {
        this.mess = error;
        console.log(this.mess);
        this.messError = this.mess.error.message;
        this.cates.length = 0;
    });
    this.messError = null;
  }
  reload(){
    this.messError = null;
    this.getAllCates();
  }
}
