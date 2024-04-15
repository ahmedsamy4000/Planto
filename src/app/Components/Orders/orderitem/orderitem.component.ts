import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orderitem',
  standalone: true,
  imports: [HttpClientModule,RouterModule,CommonModule],
  providers:[UserService],
  templateUrl: './orderitem.component.html',
  styleUrl: './orderitem.component.css'
})
export class OrderitemComponent {
  @Input() item:any;
  totalPrice=0;
  
  constructor(private cart:UserService){}
    // ngOnInit(): void {
    //   this.totalPrice=this.item.quantity*this.item.product.price;
    // }
}
