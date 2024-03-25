import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
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
