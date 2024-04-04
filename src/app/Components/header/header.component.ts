import { Component, EventEmitter, Output } from '@angular/core';
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
  goToCart(){
    this.router.navigate(['/cartItems']);
  }
  GoToSearch(){
    this.router.navigate(['/searchResults']);
  }
  // this.router.navigate(['edit', userId]);
  GoToProfile(){
    console.log(this.user)
    this.router.navigate(['/profile', {name: this.user.name, email: this.user.email, phone: this.user.phone,
       age: this.user.age, street: this.user.address.street, city: this.user.address.city}]);
  }
  toggleLoginForm() {
    this.loginFormVisible = !this.loginFormVisible;
  }
  Register(email: any){
    this.isRegistered = true
    this.userService.GetUserByEmail(email).subscribe({
            next: (data2)=>{
              this.userEvent.emit(data2);
              this.user = data2;
              this.user = this.user.data;
            }
          });
  }
}
