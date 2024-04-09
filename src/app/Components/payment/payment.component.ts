import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { PaymentitemComponent } from './paymentitem/paymentitem.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [PaymentitemComponent,HttpClientModule],
  providers:[UserService],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
items:any;
numOfItems=0;

  constructor(private user:UserService){}
  ngOnInit(): void {
    this.user.GetCart(localStorage.getItem("Email")).subscribe({
      next:(data)=>{
        this.items=data;
        this.items=this.items.data;
        console.log(this.items)
        for(let item of this.items){
          console.log(item)
          this.numOfItems+=+item.quantity;
        }
      },
      error:(err)=>{
        console.log(err)
      }
    });
  }
}
