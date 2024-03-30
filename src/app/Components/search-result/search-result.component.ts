import { Component } from '@angular/core';
import { OneProductComponent } from '../Shop/one-product/one-product.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [OneProductComponent, CommonModule],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {
  products: any = ['Palm', 'Snake', 'Orchid', 'Maiden Hair', 'Alocasia', 'Pencil Plant', 'Pink Calathea'];
}
