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
  // arr: any = [
  //   'amount_cents',
  //   'created_at',
  //   'currency',
  //   'error_occured',
  //   'has_parent_transaction',
  //   'id',
  //   'integration_id',
  //   'is_3d_secure',
  //   'is_auth',
  //   'is_capture',
  //   'is_refunded',
  //   'is_standalone_payment',
  //   'is_voided',
  //   'order.id',
  //   'owner',
  //   'pending',
  //   'source_data.pan',
  //   'source_data.sub_type',
  //   'source_data.type',
  //   'success',
  // ];
  constructor(private activated: ActivatedRoute, private receiptService: ReceiptService, userService: UserService) {
    // this.hmac = activated.snapshot.queryParams['hmac'];
    // console.log(this.hmac);
    // for(var i in activated.snapshot.queryParams)
    //   this.data.push(i);
    // this.data.sort();
    // console.log(this.data);
    //{
    //     "user": "doha@gmail.com",
    //     "product": [
    //         {
    //             "name": "Palm", 
    //             "quantity": 2,
    //             "price": "800"
    //         }
    //     ],
    //     "totalPrice": 800
    // }

    userService.GetUser().subscribe({
      next: (data: any) => {
        this.user = data.data;
        console.log(this.user);
        userService.GetCart().subscribe({
          next: (data2: any) => {
            console.log(data2.data)
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
