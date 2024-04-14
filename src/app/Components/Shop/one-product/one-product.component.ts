import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-one-product',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './one-product.component.html',
  styleUrl: './one-product.component.css'
})
export class OneProductComponent implements OnChanges {
  @Input() name = "";
  @Input() price = "";
  @Input() imgSrc = "";
  currentimg = ""
  ngOnChanges(changes: SimpleChanges): void {
    this.currentimg = this.imgSrc[0];
  }
  onMouseOver() {
    this.currentimg = this.imgSrc[1];
  }
  onMouseOut() {
    this.currentimg = this.imgSrc[0];
  }
}
