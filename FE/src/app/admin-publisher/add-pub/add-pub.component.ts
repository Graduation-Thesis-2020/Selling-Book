import { Component, OnInit } from '@angular/core';
import { PublisherService } from 'src/app/service/publisher.service';
import { Publisher } from 'src/app/models/publisher';

@Component({
  selector: 'app-add-pub',
  templateUrl: './add-pub.component.html',
  styleUrls: ['./add-pub.component.css']
})
export class AddPubComponent implements OnInit {

  pub: Publisher;
  constructor(private publisherService: PublisherService) { }

  ngOnInit() {
  }
  save(name: string) {
    const newPub: Publisher = { name } as Publisher;
    this.publisherService.addPublisher(newPub).subscribe(res => this.pub = res);
    alert('Thêm Thành Công!');
  }
}
