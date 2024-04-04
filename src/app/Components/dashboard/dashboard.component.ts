import { Component,OnInit } from '@angular/core';
import {Chart,ChartOptions} from 'chart.js/auto';
import { ReceiptService } from '../../Services/recieptService';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule],
  providers:[ReceiptService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private http:ReceiptService){}
 monthSelectedValue="";
 bestsellingobj:any;
  onLanguageSelect(event: any): void {
    this.monthSelectedValue=event.target.value;
    console.log(this.monthSelectedValue);
    this.http.getRecieptsByMonth(this.monthSelectedValue).subscribe({
      next:(data)=>{
        this.bestsellingobj=data;
        console.log(this.bestsellingobj);
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

  ngOnInit() {
    
    // Data for the chart
    const xValues: string[] = ["Product1", "Product2", "Product3", "Product4", "Product5"];
    const yValues: number[] = [80, 49, 44, 24, 15];
    const barColors: string[] = ["red", "green","blue","orange","brown"];

    // Chart options
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

    // Create a new chart instance
    const myChart = new Chart("myChart", {
      type: "bar",
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: options
    });
  }
  





















}
