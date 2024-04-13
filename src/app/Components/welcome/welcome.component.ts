import { Component } from '@angular/core';
import { ProductsService } from '../../Services/productsService';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [HttpClientModule, CommonModule, LoginComponent, RegisterComponent, HttpClientModule,RouterModule],
  providers: [ProductsService, UserService],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  products: any
  isSignIn = false;
  isRegistered = false;
  name: any;

  constructor(private productsService: ProductsService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    if(!localStorage.getItem('Email'))
      {
        this.isRegistered = false;
      }
      else
      {
        this.isRegistered = true;
        this.userService.GetUserByEmail(localStorage.getItem('Email')).subscribe({
          next: (data)=>{
            this.name = data;
            this.name = this.name.data['name'];
          }
        })
      }
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.products = this.products.data;
        this.products.sort((a: any, b: any) => b["count"] - a["count"]);
        this.products = this.products.slice(0, 3);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  GoToShop() {
    this.router.navigate(['/shop']);
  }
  SignIn() {
    if (!localStorage.getItem('Email')) {
      this.isSignIn = true;
    }
  }

}
