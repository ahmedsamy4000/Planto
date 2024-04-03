import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-photo',
  standalone: true,
  imports: [],
  templateUrl: './product-photo.component.html',
  styleUrl: './product-photo.component.css'
})
export class ProductPhotoComponent {
  @Input() imgs="";
  current=""
  constructor() {
   

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.current = this.imgs[0];
  }

  next() {
    this.current=this.imgs[1]
  }

  previous() {
    this.current=this.imgs[0]
  }
}
