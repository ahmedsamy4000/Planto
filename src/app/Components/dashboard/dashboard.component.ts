import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js/auto';
import { ReceiptService } from '../../Services/recieptService';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FeedBackService } from '../../Services/feedbackService';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
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

  constructor(private http: ReceiptService,private feedbackhttp:FeedBackService) { }
  onLanguageSelect(event: any): void {
    this.monthSelectedValue = event.target.value;
    console.log(this.monthSelectedValue);
    this.fetchData();
  }
  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    this.http.getRecieptsByMonth(this.monthSelectedValue).subscribe({
      next: (data) => {
        
        this.bestsellingobj = data;
        this.sortarray=Object.entries(this.bestsellingobj.data).map(([key,value])=>({key,value}));
        this.sortarray.sort((a:any,b:any)=>b.value-a.value);
        this.bestsellingobj.data={};
        console.log(this.sortarray);
        for(let i=0;i<this.sortarray.length;i++){
          this.bestsellingobj.data[this.sortarray[i]["key"]]=this.sortarray[i]["value"];
        }
      
        console.log(this.bestsellingobj.data);
        this.productsNames = Object.keys(this.bestsellingobj.data);
        this.productvalues = Object.values(this.bestsellingobj.data);
        this.updateChart();
      },
      error: (error) => {
        console.log(error);
      }
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
        console.log(this.feedbacks);
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
