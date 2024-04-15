import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transactionitem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactionitem.component.html',
  styleUrl: './transactionitem.component.css'
})
export class TransactionitemComponent {
  @Input() item:any;
  totalPrice=0;
}
