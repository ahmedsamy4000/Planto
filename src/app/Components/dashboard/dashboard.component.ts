import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js/auto';
import { ReceiptService } from '../../Services/recieptService';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FeedBackService } from '../../Services/feedbackService';
import { AddproductComponent } from '../Shop/addproduct/addproduct.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule,CommonModule,AddproductComponent],
  providers: [ReceiptService,FeedBackService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  monthSelectedValue = "4";
  sortarray:any;
  bestsellingobj: any;
  productsNames: any;
  productvalues: any;
  myChart: Chart | undefined;
  feedbacks:any;
  TotalMoney:any;
  TotalOrdes:any;
  totalProducts=0;
  totalprofit=0;
  Fees=0;
  netProfit=0;

  constructor(private http: ReceiptService,private feedbackhttp:FeedBackService) { }
  onMonthSelect(event: any): void {
    this.monthSelectedValue = event.target.value;
    this.fetchData();
    this.fetchMoneyData();

  }
  ngOnInit() {
    this.fetchData();
    this.fetchMoneyData();
  }

  fetchMoneyData() {
    this.http.getMonetStat(this.monthSelectedValue).subscribe({
      next: async (data) => {
        let money: any = data;
        this.TotalMoney = await money.data.TotalProfit;
        this.TotalOrdes = await money.data.TotalOrders;
        this.statMoney( this.TotalMoney)

      },
      error: (error) => {
        console.error("Error fetching money data:", error);
      }
    });
  }
  statMoney(Totalmon:any){
    this.totalprofit=Totalmon-Totalmon*20/100;
    this.Fees=Totalmon*10/100;
    this.netProfit=this.totalprofit- this.Fees;

  }

  fetchData() {
    this.http.getRecieptsByMonth(this.monthSelectedValue).subscribe({
      next: (data) => {
        
        this.bestsellingobj = data;
        this.sortarray=Object.entries(this.bestsellingobj.data).map(([key,value])=>({key,value}));
        this.sortarray.sort((a:any,b:any)=>b.value-a.value);
        this.bestsellingobj.data={};
        for(let i=0;i<this.sortarray.length;i++){
          this.bestsellingobj.data[this.sortarray[i]["key"]]=this.sortarray[i]["value"];
        }
        this.productsNames = Object.keys(this.bestsellingobj.data);
        this.productvalues = Object.values(this.bestsellingobj.data);
        this.CalcTotalProducts(this.productvalues);
        this.updateChart();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  CalcTotalProducts(productvalues:any){
    this.totalProducts=0
    this.productvalues.forEach((value: number) => {
    this.totalProducts += value;
    });
  }
  

  updateChart() {
    if (this.myChart) {
      this.myChart.data.labels = this.productsNames;
      this.myChart.data.datasets[0].data = this.productvalues;
      this.myChart.update();
    } else {
      const barColors: string[] = ["red", "green", "blue", "orange", "brown"];

      const options: ChartOptions<'bar'> = {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false
          }
        },
      };

      this.myChart = new Chart("myChart", {
        type: "bar",
        data: {
          labels: this.productsNames,
          datasets: [{
            backgroundColor: barColors,
            data: this.productvalues
          }]
        },
        options: options
      });
    }
  }

  openPage(id:string){
    this.feedbackhttp.getFeedBacks().subscribe({
      next:(data)=>{
        this.feedbacks=data;
        this.feedbacks=this.feedbacks.data;
      },
      error:(error)=>{
        console.log(error);
      }
    })
    document.getElementById(id)!.style.display="flex";
  }
  closePage(id:string) {
    document.getElementById(id)!.style.display = "none";
  }
}
