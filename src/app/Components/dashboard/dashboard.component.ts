import { Component,OnInit } from '@angular/core';
import {Chart,ChartOptions} from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
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
  }}
