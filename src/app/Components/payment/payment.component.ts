import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { PaymentitemComponent } from './paymentitem/paymentitem.component';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReceiptService } from '../../Services/recieptService';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [PaymentitemComponent, HttpClientModule, RouterModule, CommonModule,LoadingComponent],
  providers:[UserService, ReceiptService],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
items:any;
numOfItems=0;
totalPrice=0;
cartt: {name: string, amount_cents: any, quantity: any}[] = [];
userData: any;

  constructor(private user:UserService, private receipt: ReceiptService){}
  ngOnInit(): void {
    this.user.GetUser().subscribe({
      next:(data)=>{
        this.userData=data;
        this.userData=this.userData.data;
      },
      error:(err)=>{
        console.log(err)
      }
    });
    this.user.GetCart().subscribe({
      next:(data)=>{
        this.items=data;
        this.items=this.items.data;
        console.log(this.items)
        for(let item of this.items){
          this.numOfItems+=+item.quantity;
          this.totalPrice+=item.quantity*item.product.price;
          let obj = {name: item.product.name, amount_cents: item.product.price * 100, quantity: item.quantity};
          this.cartt.push(obj);
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
  token: any;
makePayment(){
    this.receipt.getToken('ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1Rjd05qazVMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuTzk3N0NJTm5PWWlpSkJjLTMxVy1Nb1NWSkJWeUNzLWhlWkxzN09seHFYQ3RmY1R5SG55ekJscFlVUURyVkJ0UmUxRkhXMGlZTnpyMG9ULUtnaFRZRVE=').subscribe({
      next: (response: any) => {
        this.token = response.token;
        this.receipt.createOrder(this.token, this.cartt, this.totalPrice * 100).subscribe({
          next: (response2: any) => {
            console.log(response2);
            this.receipt.getPaymentToken(this.token, response2.amount_cents, response2.id, this.userData.email, this.userData.name, this.userData.address.street, this.userData.phone, this.userData.address.city).subscribe({
              next: (res3: any) => {
                location.assign('https://accept.paymob.com/api/acceptance/iframes/837788?payment_token='+res3.token);
              },
              error: (err) =>{
                console.log(err);
              }
            })
          },
          error: (err) =>{
            console.log(err);
          }
        })
      },
      error: (err) =>{
        console.log(err);
      }
    });
    
  }
}
