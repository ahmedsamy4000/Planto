import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  @Input() name = "";
  @Input() description = "";
  @Input() price = "";
  @Input() category = "";



  
  constructor(private myActivated: ActivatedRoute) {
  }

}
