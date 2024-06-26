import { Component, OnInit, output } from '@angular/core';
import { CardItemComponent } from '../card-item/card-item.component';
import { CartEmptyComponent } from '../cart-empty/cart-empty.component';
import { UserService } from '../../../Services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-items',
  standalone: true,
  imports: [CardItemComponent,CartEmptyComponent,HttpClientModule,RouterModule,CommonModule],
  providers:[UserService],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.css'
})
export class CartItemsComponent implements OnInit{
flag=0
items:any
outputPrice:number=0
totalPrice=0
i:any
constructor(private user:UserService, private router:Router){

}
  ngOnInit(): void {
    this.user.GetCart().subscribe({
      next:(data)=>{
        this.items=data;
        this.items=this.items.data;
        this.flag=this.items.length>0?1:0;
        for(let item of this.items){
          this.i=item;
          this.totalPrice+=this.i.quantity*this.i.price;
        }
      },
      error:(err)=>{
        console.log(err)
      }
    });
  }

  output(data:number){
    this.totalPrice+=+data;
  }

  goToReceipt(){
    this.router.navigate(['/payment']);
  }
}
