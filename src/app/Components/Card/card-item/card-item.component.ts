import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css'
})
export class CardItemComponent {
@Input() item:any;
Plus(){
this.item.quantity+=1;
}
Minus(){
  this.item.quantity-=1;
}
}
