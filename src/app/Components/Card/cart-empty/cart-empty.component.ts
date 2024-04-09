import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-empty',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cart-empty.component.html',
  styleUrl: './cart-empty.component.css'
})
export class CartEmptyComponent {
  constructor(private router:Router){}
  goToShop(){
    this.router.navigate(['/shop']);
  }
}
