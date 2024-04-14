import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../Services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { jwtDecode } from "jwt-decode";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RegisterComponent, RouterModule, HttpClientModule, FormsModule, CommonModule, ReactiveFormsModule],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  
  constructor(private login: LoginService) { }
  user: any;
  registerFormVisible = false;
  
  @Output() closeForm = new EventEmitter();
  @Output() userEvent = new EventEmitter();
  @Input() IsLogin:any
  onCloseForm() {
   
    // this.router.navigateByUrl('/welcome', { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['/welcome']);
    // });
    location.reload();
    this.closeForm.emit();
  }
  ToggleLogin(){
    this.registerFormVisible=false;
  }
  toggleRegisterForm() {
    this.registerFormVisible = !this.registerFormVisible;
  }
  

  loginFormGroup = new FormGroup({
    email: new FormControl('', [Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"), Validators.required]),
    password: new FormControl('', [Validators.minLength(8), Validators.required]),
  });

  get EmailValid() {
    return this.loginFormGroup.controls["email"].valid;
  }
  get PasswordValid() {
    return this.loginFormGroup.controls["password"].valid;
  }

  emailValid = "";
  passwordValid = "";
  epValid = "";

  resetEmail() {
    this.emailValid = "";
  }
  resetPassword() {
    this.passwordValid = "";
  }

  OnLogin(email: any, password: any) {
    this.login.login({ email, password }).subscribe({
      next: (data) => {
        if (this.loginFormGroup.valid&&data.body.message==true) {
          localStorage.setItem("userToken", data.headers.get('x-auth-token'));
          this.onCloseForm();
        }
        else {
          if(this.loginFormGroup.controls['email'].value == "" || this.loginFormGroup.controls['password'].value == "")
          {
            if (this.loginFormGroup.controls['email'].value == "") {
              this.emailValid = "Email is required"
            }
            if (this.loginFormGroup.controls['password'].value == "") {
              this.passwordValid = "Password is required"
            }
          }
          else {
              console.log("Invalid Email/Password")
              this.epValid = "Invalid Email/Password";
            
          }
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
