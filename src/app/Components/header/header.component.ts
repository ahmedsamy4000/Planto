import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router:Router){

  }
  goToCart(){
    this.router.navigate(['/cartItems']);
  }
  GoToSearch(){
    this.router.navigate(['/searchResults']);
    //this.router.navigate(['/cartItems']);
  }
}
