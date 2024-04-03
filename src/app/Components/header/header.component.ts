import { Component, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  loginFormVisible = false;
  isRegistered = false;
  constructor(private router:Router){

  }
  goToCart(){
    this.router.navigate(['/cartItems']);
  }
  GoToSearch(){
    this.router.navigate(['/searchResults']);
  }
  toggleLoginForm() {
    this.loginFormVisible = !this.loginFormVisible;
  }
  Register(user: any){
    this.isRegistered
    console.log(user);
  }
}
