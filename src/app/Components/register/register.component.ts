import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RegisterService } from '../../Services/register.service';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule],
  providers: [RegisterService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  gender: any;
  @Input() close: any;
  emitRegister(email: any) {
    this.registerSuccess.emit(email);
  }
  @Output() registerSuccess = new EventEmitter();
  constructor(private register: RegisterService, private router: Router, private userService: UserService) { }

  registerFormGroup = new FormGroup({
    name: new FormControl('', [Validators.pattern("^[a-z A-Z]*$"), Validators.required]),
    email: new FormControl('', [Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"), Validators.required]),
    password: new FormControl('', [Validators.minLength(8), Validators.required]),
    age: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.pattern("^(010|011|012|015)[0-9]{8}$"), Validators.required]),
    gender: new FormControl('', [Validators.required]),
  });

  get NameValid() {
    return this.registerFormGroup.controls["name"].valid;
  }
  get AgeValid() {
    return this.registerFormGroup.controls["age"].valid;
  }
  get EmailValid() {
    return this.registerFormGroup.controls["email"].valid;
  }
  get PasswordValid() {
    return this.registerFormGroup.controls["password"].valid;
  }
  get StreetValid() {
    return this.registerFormGroup.controls["street"].valid;
  }
  get CityValid() {
    return this.registerFormGroup.controls["city"].valid;
  }
  get PhoneValid() {
    return this.registerFormGroup.controls["phone"].valid;
  }
  get GenderValid() {
    return this.registerFormGroup.controls["gender"].valid;
  }

  ageValid = ""
  nameValid = ""
  emailValid = ""
  passwordValid = ""
  streetValid = ""
  cityValid = ""
  phoneValid = ""
  genderValid = ""

  resetAge() {
    this.ageValid = ""
  }
  resetName() {
    this.nameValid = ""
  }
  resetPassword() {
    this.passwordValid = ""
  }
  resetEmail() {
    this.emailValid = ""
  }
  resetStreet() {
    this.streetValid = ""
  }
  resetCity() {
    this.cityValid = ""
  }
  resetPhone() {
    this.phoneValid = ""
  }
  resetGender() {
    this.genderValid = ""
  }
  onRegister(name: any, email: any, street: any, city: any, age: any, password: any, phone: any) {
    this.register.register({ name, password, email, gender: this.gender, age, address: { street, city }, phone }).subscribe({
      next: (data) => {
        if (this.registerFormGroup.valid) {
          // this.userService.GetUserByEmail(email).subscribe({
          //   next: (data2) => {
          //     console.log(data2);
          //     this.emitRegister(data2);
          //   }
          // });
          this.emitRegister(email)
          this.close.emit();
        }
        else {
          if (this.registerFormGroup.controls["age"].value == "") {
            this.ageValid = "Age is required"
          }
          if (this.registerFormGroup.controls["name"].value == "") {
            this.nameValid = "Name is required"
          }
          if (this.registerFormGroup.controls["password"].value == "") {
            this.passwordValid = "Password is required"
          }
          if (this.registerFormGroup.controls["email"].value == "") {
            this.emailValid = "Email is required"
          }
          if (this.registerFormGroup.controls["phone"].value == "") {
            this.phoneValid = "Phone is required"
          }
          if (this.registerFormGroup.controls["street"]) {
            this.streetValid = "Street is required"
          }
          if (this.registerFormGroup.controls["city"].value == "") {
            this.cityValid = "City is required"
          }
          if (!this.gender) {
            this.genderValid = "Gender is required"
          }
        }
      },
      error: (err) => { console.log(err) }
    });
  }
}
