import { Component, OnInit } from '@angular/core';
import { OneProductComponent } from '../one-product/one-product.component';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../Services/productsService';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [OneProductComponent, CommonModule,HttpClientModule],
  providers:[ProductsService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: any 

  constructor(private productsService: ProductsService) { }

  async ngOnInit() {
    try {
      const data: any = await this.productsService.getProducts().toPromise();
      this.products = data.data; 
      console.log('Products fetched successfully:', this.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
}
