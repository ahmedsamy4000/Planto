import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js/auto';
import { ReceiptService } from '../../Services/recieptService';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule],
  providers: [ReceiptService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  monthSelectedValue = "4";
  bestsellingobj: any;
  productsNames: any;
  productvalues: any;
  myChart: Chart | undefined;

  constructor(private http: ReceiptService) { }

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
        console.log(this.bestsellingobj);
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
}
