import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductPhotoComponent } from '../product-photo/product-photo.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { SuggesstionComponent } from '../suggesstion/suggesstion.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../../Services/productsService';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterModule, ProductPhotoComponent, ProductDetailsComponent, SuggesstionComponent,HttpClientModule],
  providers:[ProductsService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  name = "";
  product:any;
  constructor(private myActivated: ActivatedRoute, private productsService: ProductsService) {
    this.name = this.myActivated.snapshot.params['name'];
  }
  ngOnInit() {
    try {
      this.productsService.getOneProduct(this.name).subscribe({
        next:(data)=>{
          console.log(data)
          
          this.product=data;
          this.product=this.product.data;
          console.log(this.product)

        },
        error:(err)=>{
          console.log(err)
        }
      })
       
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

}
