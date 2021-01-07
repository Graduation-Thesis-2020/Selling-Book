import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
import { AdminService } from './../../service/admin.service';
import { StatAllCustomer, StatAllProduct } from './../../models/admin';
import { LoginReturn } from 'src/app/models/user';
import { BooksService } from './../../service/book.service';
import { BookEdit } from 'src/app/models/book';

@Component({
  selector: 'app-admin-stat-products',
  templateUrl: './admin-stat-products.component.html',
  styleUrls: ['./admin-stat-products.component.css']
})
export class AdminStatProductsComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };


  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  constructor(private adminService: AdminService, private BooksService: BooksService ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
      };
  }
  pieChartLabels: Label[];
  pieChartData: SingleDataSet ;
  pieChartLabels1: Label[];
  pieChartData1: SingleDataSet ;
  config: any;
  user ;
  image: string;
  name: string;
  messNumError: any;
  messStatError: any;
  statAllProduct: StatAllProduct[];
  numNewCus: LoginReturn[];
  num : number;
  total=0;
  totalEnd=0;
  tokenAdmin = localStorage.getItem("tokenAdmin");
  id = "All";
  all = true;
  books: BookEdit[];
  ngOnInit() {
    //this.loadUser();
    this.getStatAllProduct();
    //this.getNumberNewCusomer();
    this.getAllBook();
    console.log(this.id);
  }


  getStatAllProduct(){
   this.adminService.GetAllStatProduct(this.tokenAdmin, this.id).subscribe(res=> {this.statAllProduct = res;
       console.log(this.statAllProduct);
        for(let i =5; i<this.statAllProduct.length; i++){
          this.total += this.statAllProduct[i].Quantity;
        }
        console.log(this.total);

        this.pieChartLabels = [this.statAllProduct[0].title,  this.statAllProduct[1].title,
                               this.statAllProduct[2].title,this.statAllProduct[3].title,this.statAllProduct[4].title, 'Còn lại'];
        this.pieChartData =[this.statAllProduct[0].Quantity, this.statAllProduct[1].Quantity,this.statAllProduct[2].Quantity,
                           this.statAllProduct[3].Quantity,this.statAllProduct[4].Quantity, this.total];

    },err => {this.messStatError = err;});
    this.messStatError = null;
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
  selected(id){
    this.id=id
    if(this.id != "All"){
      this.all = false;
    } else {
      this.all = true;
    }
    console.log(this.id);
    this.total =0;
    this.getStatAllProduct();
  }
  getAllBook() {
    this.BooksService.getBooksAdmin().subscribe(res => {this.books = res});
  }
}
