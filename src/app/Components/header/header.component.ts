import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../../Services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, LoginComponent, HttpClientModule, RouterModule],
  providers: [UserService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  loginFormVisible = false;
  isRegistered = false;
  user: any;
  @Output() userEvent = new EventEmitter();
  constructor(private router:Router, private userService: UserService){

  }
  ngOnInit(): void {
    //localStorage.clear();
    this.Register();
  }
  goToCart(){
    this.router.navigate(['/cartItems']);
  }
  GoToSearch(){
    this.router.navigate(['/searchResults']);
  }
  // this.router.navigate(['edit', userId]);
  GoToProfile(){
    console.log(this.user)
    this.router.navigate(['/profile']);
  }
  toggleLoginForm() {
    this.loginFormVisible = !this.loginFormVisible;
  }
  Register(){
    console.log(localStorage.getItem("Email"))
    if(localStorage.getItem("Email"))
      {
        console.log("Success")
        this.isRegistered = true
      }
      
}
}
