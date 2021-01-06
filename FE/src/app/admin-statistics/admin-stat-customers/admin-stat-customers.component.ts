import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
import { AdminService } from './../../service/admin.service';
import { StatAllCustomer } from './../../models/admin';
import { LoginReturn } from 'src/app/models/user';


@Component({
  selector: 'app-admin-stat-customers',
  templateUrl: './admin-stat-customers.component.html',
  styleUrls: ['./admin-stat-customers.component.css']
})
export class AdminStatCustomersComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };


  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  constructor(private adminService: AdminService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.config = {
      itemsPerPage: 15,
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
  statAllUser: StatAllCustomer[];
  numNewCus: LoginReturn[];
  num : number;
  total=0;
  totalEnd=0;
  tokenAdmin = localStorage.getItem("tokenAdmin");
  id = "All";
  all = true;

  ngOnInit() {
    //this.loadUser();
    this.getStatAllCusomer();
    this.getNumberNewCusomer();
    console.log(this.id);
  }

  // loadUser() {
  //   this.user = JSON.parse(localStorage.getItem("currentUser"));
  //   console.log(this.user);
  //   this.image = this.user.imageUrl;
  //   this.name= this.user.name;
  // }
  getStatAllCusomer(){
   this.adminService.GetAllStatUser(this.tokenAdmin, this.id).subscribe(res=> {this.statAllUser = res;
       console.log(this.statAllUser);
        for(let i =5; i<this.statAllUser.length; i++){
          this.total += this.statAllUser[i].totalPrice;
        }
        console.log(this.total);

        this.pieChartLabels = [this.statAllUser[0].fullname,  this.statAllUser[1].fullname,
                               this.statAllUser[2].fullname,this.statAllUser[3].fullname,this.statAllUser[4].fullname, 'Còn lại'];
        this.pieChartData =[this.statAllUser[0].totalPrice, this.statAllUser[1].totalPrice,this.statAllUser[2].totalPrice,
                           this.statAllUser[3].totalPrice,this.statAllUser[4].totalPrice, this.total];

    },err => {this.messStatError = err;});
    this.messStatError = null;
  }
  getNumberNewCusomer(){
    this.adminService.GetNumNewCustomer(this.tokenAdmin, this.id).subscribe(res=> {this.numNewCus = res;
       console.log(this.numNewCus);
       this.num = this.numNewCus.length;
    }, err => {
      this.messNumError = err;
      this.num = 0;
    });
    this.messNumError = null;
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
    this.getNumberNewCusomer();
    this.total =0;
    this.getStatAllCusomer();
  }
}
