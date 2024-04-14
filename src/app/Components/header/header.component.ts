import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../../Services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, LoginComponent, HttpClientModule],
  providers: [UserService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  loginFormVisible = false;
  isRegistered = false;
  user: any;
  isAdmin: any;
  @Output() userEvent = new EventEmitter();
  constructor(private router: Router, private userService: UserService) {

  }
  ngOnInit(): void {
    this.Register();
  }
  goToCart() {
    this.router.navigate(['/cartItems']);
  }
  goToFavourites(){
    this.router.navigate(['/favourites']);
  }
  GoToSearch() {
    this.router.navigate(['/searchResults']);
  }
  GoToProfile() {
    console.log(this.user)
    this.router.navigate(['/profile']);
  }
  toggleLoginForm() {
    this.loginFormVisible = !this.loginFormVisible;
  }
  Register() {
    if (localStorage.getItem("userToken")) {
      this.isRegistered = true
      interface MyToken {
        email: string;
        id: string;
        isAdmin: string;
        iat:number
      };
      const decodedToken = jwtDecode<MyToken>(localStorage.getItem("userToken")!);
      this.isAdmin = decodedToken.isAdmin;
    }
  }

  Logout(){
    localStorage.removeItem('userToken');
    this.isRegistered=false;
    this.router.navigate(['/'])
  }
  
}
