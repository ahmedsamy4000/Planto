import { Component } from '@angular/core';

@Component({
  selector: 'app-one-product',
  standalone: true,
  imports: [],
  templateUrl: './one-product.component.html',
  styleUrl: './one-product.component.css'
})
export class OneProductComponent {
  imgSrc = "assets/Images/Product1/1.jpg";
  onMouseOver(){
    this.imgSrc = "assets/Images/Product1/2.jpg"
  }
  onMouseLeave(){
    this.imgSrc = "assets/Images/Product1/1.jpg"
  }
}
