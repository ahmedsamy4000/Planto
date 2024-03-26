import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  name = "";
  constructor(private myActivated: ActivatedRoute) {
    this.name = this.myActivated.snapshot.params['name'];
  }
}
