import { Component, OnInit } from '@angular/core';
import { CardItemComponent } from '../card-item/card-item.component';
import { CartEmptyComponent } from '../cart-empty/cart-empty.component';
import { UserService } from '../../../Services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cart-items',
  standalone: true,
  imports: [CardItemComponent,CartEmptyComponent,HttpClientModule],
  providers:[UserService],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.css'
})
export class CartItemsComponent implements OnInit{
flag=0
items:any
constructor(private user:UserService){

}
  ngOnInit(): void {
    this.user.GetCart(localStorage.getItem("Email")).subscribe({
      next:(data)=>{
        this.items=data;
        this.items=this.items.data;
        console.log(this.items)
        this.flag=this.items.length>0?1:0;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
