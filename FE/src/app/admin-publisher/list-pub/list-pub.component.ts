import { Component, OnInit } from '@angular/core';
import { PublisherService } from 'src/app/service/publisher.service';
import { Publisher } from 'src/app/models/publisher';
import {MatSnackBar, MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
@Component({
  selector: 'app-list-pub',
  templateUrl: './list-pub.component.html',
  styleUrls: ['./list-pub.component.css']
})
export class ListPubComponent implements OnInit {

  pubs: Publisher[];
  pub: Publisher;
  config: any;
  mess: any;
  messError: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private PublisherService: PublisherService,  private _snackBar: MatSnackBar,) {
    this.config = {
      itemsPerPage: 15,
      currentPage: 1
      };
  }
  pageChanged(event) {
    this.config.currentPage = event;
    }

  ngOnInit() {
    this.getAllPublisher();
  }

  getAllPublisher() {
    this.PublisherService.getPublishers().subscribe(res => {this.pubs = res; this.pub = this.pubs[0]});
  }
  delete(id) {
    this.PublisherService.delete(id).subscribe(() => {this.getAllPublisher();
      this._snackBar.open("Xóa thành công","Đóng", {
        panelClass: "snackbarConfig1",
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
  });
  }
  save(name: string) {
    const newPub: Publisher = { name } as Publisher;
    this.PublisherService.addPublisher(newPub).subscribe(
      res => {
        this.pub = res;
        this.getAllPublisher();
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
  getPublisher(_id){
    this.PublisherService.getPublisherFromPublisherID(_id).subscribe(res => this.pub = res);
  }
  search(title: string){
    this.PublisherService.searchPublisherAdmin(title).subscribe(res => this.pubs = res,
      error => {
        this.mess = error;
        this.messError = this.mess.error.message;
        this.pubs.length = 0;
    });
    this.messError = null;
  }
  reload(){
    this.messError = null;
    this.getAllPublisher();
  }
  Edit() {
    this.PublisherService.editPublisher(this.pub).subscribe(() => {this.getAllPublisher();
      this._snackBar.open("Chỉnh sửa thành công","Đóng", {
        panelClass: "snackbarConfig1",
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });});
  }
}
