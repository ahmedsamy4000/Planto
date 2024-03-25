import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-one-product',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './one-product.component.html',
  styleUrl: './one-product.component.css'
})
export class OneProductComponent implements OnChanges{
  @Input() name = "";
  imgSrc = "";
  ngOnChanges(changes: SimpleChanges): void {
    this.imgSrc = "assets/Images/"+this.name+"/1.jpg";
  }
  onMouseOver(){
    this.imgSrc = "assets/Images/"+this.name+"/2.jpg";
  }
  onMouseOut(){
    this.imgSrc = "assets/Images/"+this.name+"/1.jpg";
  }
}
