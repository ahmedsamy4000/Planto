import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReceiptService } from '../../Services/recieptService';
import { UserService } from '../../Services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-transaction-success',
  standalone: true,
  imports: [HttpClientModule],
  providers: [ReceiptService, UserService],
  templateUrl: './transaction-success.component.html',
  styleUrl: './transaction-success.component.css'
})
export class TransactionSuccessComponent {
  cart: any = [];
  success: any;
  user: any;
  totalPrice: any = 0;
  constructor(private activated: ActivatedRoute, private receiptService: ReceiptService, userService: UserService) {
    userService.GetUser().subscribe({
      next: (data: any) => {
        this.user = data.data;
        userService.GetCart().subscribe({
          next: (data2: any) => {
            for (var c of data2.data) {
              this.totalPrice += c.quantity * c.product.price;
              this.cart.push({ name: c.product.name, quantity: c.quantity, price: c.product.price })
            }
            this.success = activated.snapshot.queryParams['success'];
            if (this.success) {
              receiptService.AddReceipt({ user: this.user.email, product: this.cart, totalPrice: this.totalPrice }).subscribe({
                next: (data3) => {
                  userService.DeleteCart().subscribe({
                    next: (res) => {
                    },
                    error: (err)=>{
                      console.log(err);
                    }
                  })
                },
                error: (err)=>{
                  console.log(err);
                }
              })
            }
          },
          error: (err)=>{
            console.log(err);
          }
        })
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }
}
