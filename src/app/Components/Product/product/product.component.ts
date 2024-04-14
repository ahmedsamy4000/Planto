import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductPhotoComponent } from '../product-photo/product-photo.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { SuggesstionComponent } from '../suggesstion/suggesstion.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../../Services/productsService';
import { LoadingComponent } from '../../loading/loading.component';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterModule, ProductPhotoComponent, ProductDetailsComponent, SuggesstionComponent, HttpClientModule, LoadingComponent],
  providers: [ProductsService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  name = "";
  product: any;
  isAdmin: any;

  constructor(private myActivated: ActivatedRoute, private productsService: ProductsService) {
    this.name = this.myActivated.snapshot.params['name'];
  }
  ngOnInit() {
    try {
      this.productsService.getOneProduct(this.name).subscribe({
        next: (data) => {
          this.product = data;
          this.product = this.product.data;

        },
        error: (err) => {
          console.log(err)
        }
      })

    } catch (error) {
      console.error('Error fetching products:', error);
    }
    if (localStorage.getItem("userToken")) {
      interface MyToken {
        email: string;
        id: string;
        isAdmin: string;
        iat:number
      };
      const decodedToken = jwtDecode<MyToken>(localStorage.getItem("userToken")!);
      this.isAdmin = decodedToken.isAdmin;
    }
  }

}
