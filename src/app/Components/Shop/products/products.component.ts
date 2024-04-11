import { Component, OnInit } from '@angular/core';
import { OneProductComponent } from '../one-product/one-product.component';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../Services/productsService';
import { HttpClientModule } from '@angular/common/http';
import { AddproductComponent } from '../addproduct/addproduct.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [OneProductComponent, CommonModule,HttpClientModule,AddproductComponent],
  providers:[ProductsService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: any 

  constructor(private productsService: ProductsService) { }

   ngOnInit() {
    try {
      this.productsService.getProducts().subscribe({
        next:(data)=>{
          console.log(data)
          this.products = data; 
          this.products=this.products.data;
          console.log('Products fetched successfully:', this.products);
        },
        error:(err)=>{console.log(err)}
      })
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  add(form:any){
    form.style.display = "flex";
  }
}
