import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { PaymentitemComponent } from './paymentitem/paymentitem.component';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReceiptService } from '../../Services/recieptService';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [PaymentitemComponent, HttpClientModule, RouterModule, CommonModule],
  providers:[UserService, ReceiptService],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
items:any;
numOfItems=0;
totalPrice=0;
userData: any;

  constructor(private user:UserService, private receipt: ReceiptService){}
  ngOnInit(): void {
    this.user.GetUserByEmail(localStorage.getItem("Email")).subscribe({
      next:(data)=>{
        this.userData=data;
        this.userData=this.userData.data;
      },
      error:(err)=>{
        console.log(err)
      }
    });
    this.user.GetCart(localStorage.getItem("Email")).subscribe({
      next:(data)=>{
        this.items=data;
        this.items=this.items.data;
        console.log(this.items)
        for(let item of this.items){
          console.log(item)
          this.numOfItems+=+item.quantity;
          this.totalPrice+=item.quantity*item.product.price;
        }
      },
      error:(err)=>{
        console.log(err)
      }
    });
  }
  
  // goToShop(){
  //   this.router.navigate(['/shop']);
  // }
  output(data:number){
    this.totalPrice+=+data;
  }

  makePayment(){
    this.receipt.checkout({name: 'Palm'}).subscribe({
      next: (data: any)=>{
        console.log(data);
        location.assign(data.url);
      }
    })
  }
}
