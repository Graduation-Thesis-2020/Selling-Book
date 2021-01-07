import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
import { AdminService } from 'src/app/service/admin.service';
import { StatDay, StatMonthHaveStatDay, StatOrderDetail } from './../../models/admin';

@Component({
  selector: 'app-admin-stat-profit-month',
  templateUrl: './admin-stat-profit-month.component.html',
  styleUrls: ['./admin-stat-profit-month.component.css'],
  providers: [DatePipe]
})
export class AdminStatProfitMonthComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Số đơn hàng thanh toán khi nhận hàng',  'Số đơn hàng thanh toán PayPal'];
  public pieChartData: SingleDataSet ;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public barChartOptions: ChartOptions = {
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
    },
    responsive: true,
  };

  constructor( private adminService: AdminService, private  datepipe: DatePipe) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
      };
  }
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  barChartLabels: Array <any>;
  barChartData: ChartDataSets[];
  barChartLabels1: Label[]
  barChartData1: ChartDataSets[]
  statDay: StatDay;
  statDateDetail: StatOrderDetail[];
  statMonthEachDay: StatMonthHaveStatDay;
  day: Date;
  date: string;
  messStatError: any;
  currentDay: string;
  isPaid =0;
  notPaid =0;
  tokenAdmin = localStorage.getItem("tokenAdmin");
  config : any;
  ArraytotalRevenue : number[] =[];
  ArraytotalProfit : number[] =[];
  ArraytotalBill: number[] =[];
  ArraytotalLabel: string[]=[];
  ngOnInit() {
    this.getCurrentDay();
    this.getStatMonth();
    this.getStatMonthHaveStatDay();
  }

  selected(t){
    this.date = t;
    console.log(this.date);
    this.getStatMonth();
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  getStatMonth(){
    console.log("abc: "+this.date);
    this.adminService.GetStatMonth(this.tokenAdmin, this.date).subscribe(res=> {this.statDay = res;
      this.statDateDetail = this.statDay.totalOrderDetail;
      this.statDateDetail.reverse();
        console.log(this.statDay);

     },err => {this.messStatError = err;});
     this.messStatError = null;

   }
   getStatMonthHaveStatDay(){
    this.adminService.GetStatMonthHaveStatDay(this.tokenAdmin, this.date).subscribe(res=> {this.statMonthEachDay = res;
        console.log("each: "+this.statMonthEachDay);
        // barchart
        for(let i =0; i<this.statMonthEachDay.totalOrderDetail.length; i++){
          this.ArraytotalRevenue.push(this.statMonthEachDay.totalOrderDetail[i].Revenue);
          this.ArraytotalProfit.push(this.statMonthEachDay.totalOrderDetail[i].Profit);
          this.ArraytotalBill.push(this.statMonthEachDay.totalOrderDetail[i].Bill);
          this.ArraytotalLabel.push(this.statMonthEachDay.totalOrderDetail[i].completedDay);
        }
        console.log(this.ArraytotalBill);

        this.barChartData= [
          { data: this.ArraytotalRevenue, label: 'Doanh thu' },
          { data: this.ArraytotalProfit, label: 'Lợi nhuận' }
        ];
        this.barChartData1= [
          { data: this.ArraytotalBill, label: 'Đơn hàng', backgroundColor: '#ffce56' }
        ];
        this.barChartLabels = this.ArraytotalLabel;
        console.log(this.ArraytotalRevenue);
        console.log(this.barChartLabels);

     },err => {this.messStatError = err;});
     this.messStatError = null;
     this.ArraytotalProfit = [];
     this.ArraytotalRevenue = [];
   }
   getCurrentDay(){
    this.day=new Date();
    this.date =this.datepipe.transform(this.day, 'MM-yyyy');
   }

}
