import { Component, OnInit } from '@angular/core';
import { PublisherService } from 'src/app/service/publisher.service';
import { Publisher } from 'src/app/models/publisher';

@Component({
  selector: 'app-list-pub',
  templateUrl: './list-pub.component.html',
  styleUrls: ['./list-pub.component.css']
})
export class ListPubComponent implements OnInit {

  pubs: Publisher[];
  pub: Publisher;
  config: any;
  constructor(private PublisherService: PublisherService) {
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
    this.PublisherService.getPublishers().subscribe(res => this.pubs = res);
  }
  delete(title, id) {
    const ans = confirm('Xóa thông tin nhà xuất bản: ' + title );
    if (ans) {
      this.PublisherService.delete(id).subscribe(() => {
        this.getAllPublisher();
      }, error => console.error(error));
    }
  }
}
