import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductPhotoComponent } from '../product-photo/product-photo.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { SuggesstionComponent } from '../suggesstion/suggesstion.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterModule, ProductPhotoComponent, ProductDetailsComponent, SuggesstionComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  name = "";
  constructor(private myActivated: ActivatedRoute) {
    this.name = this.myActivated.snapshot.params['name'];
  }

}
