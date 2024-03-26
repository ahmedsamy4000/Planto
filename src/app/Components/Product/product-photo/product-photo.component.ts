import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-photo',
  standalone: true,
  imports: [],
  templateUrl: './product-photo.component.html',
  styleUrl: './product-photo.component.css'
})
export class ProductPhotoComponent {
  name = "";
  i = 1;
  constructor(private myActivated: ActivatedRoute) {
    this.name = this.myActivated.snapshot.params['name'];
  }

  next() {
    if (this.i == 1)
      this.i++;
  }

  previous() {
    if (this.i == 2)
      this.i--;
  }
}
