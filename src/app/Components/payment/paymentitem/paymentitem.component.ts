import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paymentitem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paymentitem.component.html',
  styleUrl: './paymentitem.component.css'
})
export class PaymentitemComponent {
  @Input() item:any;
  totalPrice=0;
}
