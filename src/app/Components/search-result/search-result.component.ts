import { Component } from '@angular/core';
import { OneProductComponent } from '../Shop/one-product/one-product.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/productsService';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [OneProductComponent, CommonModule,HttpClientModule],
  providers:[ProductsService],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {

  products:any;
  name=""
  constructor(private myActivated: ActivatedRoute, private productsService: ProductsService) {
    this.name = this.myActivated.snapshot.params['name'];
  }
   ngOnInit() {
    try {
      this.productsService.searchByName(this.name).subscribe({
        next:(data)=>{

          this.products=data;

        },
        error:(err)=>{
          console.log(err)
        }
      })
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  sortHighToLow(){
    this.products.sort((a:any, b:any) =>  b.price-a.price);
  }
  sortLowToHigh(){
    this.products.sort((a:any, b:any) => a.price - b.price);
  }

}
