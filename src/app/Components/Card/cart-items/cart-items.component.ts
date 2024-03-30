import { Component } from '@angular/core';
import { CardItemComponent } from '../card-item/card-item.component';
import { CartEmptyComponent } from '../cart-empty/cart-empty.component';

@Component({
  selector: 'app-cart-items',
  standalone: true,
  imports: [CardItemComponent,CartEmptyComponent],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.css'
})
export class CartItemsComponent {
flag=1
items=[1,2]
}
