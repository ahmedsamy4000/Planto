import { Component, Input, OnInit, input } from '@angular/core';
import { FeedBackService } from '../../../Services/feedbackService';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../../Services/productsService';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-rate',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule, FormsModule],
  providers: [ProductsService],
  templateUrl: './product-rate.component.html',
  styleUrl: './product-rate.component.css'
})

export class ProductRateComponent{
  @Input() selected: any;
  userData: any;
  selectedRating: number = 0;


  constructor(private productsService: ProductsService) { }

  calcRate() {
    this.selected.numberOfRates = +this.selected.numberOfRates + 1;
    this.selected.rate = ((+this.selectedRating + (+this.selected.rate * (+this.selected.numberOfRates - 1))) / +this.selected.numberOfRates).toFixed(2);
    this.productsService.calcProductRate(this.selected.name,this.selected.rate, this.selected.numberOfRates).subscribe({
      next: (value) => { console.log(this.selected.rate); this.closeForm(); this.openAlert(); },
      error: (error) => { console.log(error); }
    });
  }

  openAlert() {
    document.getElementById("alertForm")!.style.display = "block";
  }
  closeAlert() {
    document.getElementById("alertForm")!.style.display = "none";
  }
  openForm() {
    document.getElementById("contactForm")!.style.display = "block";
    this.selectedRating = 0;
  }

  closeForm() {
    document.getElementById("contactForm")!.style.display = "none";
  }
}
