import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../Services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RegisterComponent, RouterModule, HttpClientModule, FormsModule, CommonModule, ReactiveFormsModule],
  providers: [LoginService, UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private login: LoginService, private userService: UserService) { }
  user: any;
  registerFormVisible = false;
  @Output() registerEvent = new EventEmitter();
  @Output() closeForm = new EventEmitter();
  @Output() userEvent = new EventEmitter();
  onCloseForm() {
    this.closeForm.emit();
  }
  toggleRegisterForm() {
    this.registerFormVisible = !this.registerFormVisible;
  }
  RegisterSuccess(user: any) {
    this.registerEvent.emit(user);
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
        if (this.loginFormGroup.valid) {

          // this.userService.GetUserByEmail(email).subscribe({
          //   next: (data2)=>{
          //     // console.log(data2)
          //     this.user = data2;
          //   }
          // });
          this.RegisterSuccess(email);
          this.closeForm.emit();
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
            if (!this.EmailValid || !this.PasswordValid) {
              this.epValid = "Invalid Email/Password";
            }
          }
        }
      },
      error: (err) => {

      }
    })
  }
}
