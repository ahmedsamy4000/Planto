import { Component } from '@angular/core';
import { OneProductComponent } from '../one-product/one-product.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [OneProductComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: any = ['Palm', 'Snake', 'Orchid', 'Maiden Hair', 'Alocasia', 'Pencil Plant', 'Pink Calathea'];
}
