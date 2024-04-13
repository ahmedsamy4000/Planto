import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [HttpClientModule,RouterModule,CommonModule],
  providers:[UserService],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css'
})
export class CardItemComponent implements OnInit{
@Input() item:any;
@Input() idx:any;
@Output() cartTotalPrice=new EventEmitter();
totalPrice=0;

constructor(private cart:UserService){}
  ngOnInit(): void {
    this.totalPrice=this.item.quantity*this.item.product.price;
  }
Plus(){
  if(this.item.product.stock>this.item.quantity)
    {
      this.item.quantity+=1;
      this.totalPrice=this.item.quantity*this.item.product.price;
      this.cartTotalPrice.emit(this.item.product.price);
      console.log(this.item)
      this.cart.UpdateCart(this.item,this.idx).subscribe({
        next:(data)=>{},
        error:(err)=>{console.log(err)}
      })
    }
}
Minus(){
  if(this.item.quantity>1)
    {
      this.item.quantity-=1;
      this.totalPrice=this.item.quantity*this.item.product.price;
      this.cartTotalPrice.emit(-this.item.product.price);
      this.cart.UpdateCart(this.item,this.idx).subscribe({
        next:(data)=>{},
        error:(err)=>{console.log(err)}
      })
    }
  
}
deleteItem(){
  this.cart.DeleteFromCart(this.idx).subscribe({
    next:(data)=>{},
    error:(err)=>{console.log(err)}
  });
  location.reload();
}
}
