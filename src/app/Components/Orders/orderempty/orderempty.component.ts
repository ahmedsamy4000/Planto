import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-orderempty',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './orderempty.component.html',
  styleUrl: './orderempty.component.css'
})
export class OrderemptyComponent {
  constructor(private router:Router){}
  goToShop(){
    this.router.navigate(['/shop']);
  }
}
