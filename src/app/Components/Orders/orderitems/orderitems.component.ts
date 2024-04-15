import { Component } from '@angular/core';
import { CardItemComponent } from '../../Card/card-item/card-item.component';
import { CartEmptyComponent } from '../../Card/cart-empty/cart-empty.component';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../Services/user.service';
import { OrderemptyComponent } from '../orderempty/orderempty.component';
import { OrderitemComponent } from '../orderitem/orderitem.component';
import { ReceiptService } from '../../../Services/recieptService';

@Component({
  selector: 'app-orderitems',
  standalone: true,
  imports: [OrderitemComponent, OrderemptyComponent, HttpClientModule, RouterModule, CommonModule],
  providers: [UserService],
  templateUrl: './orderitems.component.html',
  styleUrl: './orderitems.component.css'
})
export class OrderitemsComponent {
  flag = 0;
  items: any;
  outputPrice: number = 0;
  totalPrice = 0;
  numOfItems = 0;
  cartt: { name: string, amount_cents: any, quantity: any }[] = [];
  userData: any;

  constructor(private user: UserService, private router: Router, private receipt: ReceiptService) { }
  ngOnInit(): void {
    this.user.GetUser().subscribe({
      next: (data) => {
        this.userData = data;
        this.userData = this.userData.data;
      },
      error: (err) => {
        console.log(err)
      }
    });
    this.user.GetCart().subscribe({
      next: (data) => {
        this.items = data;
        this.items = this.items.data;
        console.log(this.items)
        // this.flag = this.items.length > 0 ? 1 : 0;
        for (let item of this.items) {
          this.numOfItems += +item.quantity;
          this.totalPrice += item.quantity * item.product.price;
          // let obj = { name: item.product.name, amount_cents: item.product.price * 100, quantity: item.quantity };
          // console.log(obj)
          // this.cartt.push(obj);
          // console.log(this.cartt)
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  // output(data: number) {
  //   this.totalPrice += +data;
  // }

  // goToReceipt() {
  //   this.router.navigate(['/payment']);
  // }
}
