import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
import { AdminService } from 'src/app/service/admin.service';
import { StatDay } from './../../models/admin';

@Component({
  selector: 'app-admin-stat-profit-day',
  templateUrl: './admin-stat-profit-day.component.html',
  styleUrls: ['./admin-stat-profit-day.component.css'],
  providers: [DatePipe]
})
export class AdminStatProfitDayComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Số đơn hàng thanh toán khi nhận hàng',  'Số đơn hàng thanh toán PayPal'];
  public pieChartData: SingleDataSet ;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public barChartOptions: ChartOptions = {
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
  barChartLabels: Label[]
  barChartData: ChartDataSets[]
  statDay: StatDay;
  day: Date;
  date: string;
  messStatError: any;
  currentDay: string;
  isPaid =0;
  notPaid =0;
  tokenAdmin = localStorage.getItem("tokenAdmin");
  config : any;
  ngOnInit() {
    this.getCurrentDay();
    this.getStatDay();
  }

  selected(t){
    const format = 'dd-MM-yyyy';
    const myDate = t;
    const locale = 'en-US';
    const formattedDate = formatDate(myDate, format, locale);
    this.date = formattedDate;
    console.log(this.date);
    this.getStatDay();
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  getStatDay(){
    console.log("abc: "+this.date);
    this.adminService.GetAllStatDay(this.tokenAdmin, this.date).subscribe(res=> {this.statDay = res;
        console.log(this.statDay);
        // barchart
        this.barChartData= [
          { data: [this.statDay.totalRevenue], label: 'Doanh thu' },
          { data: [this.statDay.totalProfit], label: 'Lợi nhuận' }
        ];
        this.barChartLabels = [this.date];

        //linechart
        for(let i =0; i<this.statDay.totalOrderDetail.length; i++){
          if(this.statDay.totalOrderDetail[i].isPaid == true){
            this.isPaid += 1;
          }else{
            this.notPaid +=1;
          }
        }
        this.pieChartData=[this.notPaid, this.isPaid]
        console.log(this.isPaid);
        console.log(this.notPaid);



     },err => {this.messStatError = err;});
     this.messStatError = null;
     this.isPaid = 0;
     this.notPaid = 0;
   }
   getCurrentDay(){
    this.day=new Date();
    this.date =this.datepipe.transform(this.day, 'dd-MM-yyyy');
   }
}
