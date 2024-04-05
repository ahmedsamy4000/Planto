import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
// import { bcrybt } from "bcrybt";
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule],
  providers: [UserService],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent implements OnChanges {
  @Input() user: any;
  @Output() closeForm = new EventEmitter();
  onCloseForm() {
    this.closeForm.emit();
    location.reload();
  }

  profileFormGroup: any
  constructor(private userService: UserService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.profileFormGroup = new FormGroup({
      name: new FormControl(this.user.name, [Validators.pattern("^[a-z A-Z]*$"), Validators.required]),
      email: new FormControl(this.user.email, [Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"), Validators.required]),
      password: new FormControl('', [Validators.required]),
      newPassword: new FormControl(''),
      age: new FormControl(this.user.age, [Validators.required]),
      street: new FormControl(this.user.address.street, [Validators.required]),
      city: new FormControl(this.user.address.city, [Validators.required]),
      phone: new FormControl(this.user.phone, [Validators.pattern("^(010|011|012|015)[0-9]{8}$"), Validators.required]),
    });
  }


  get NameValid() {
    return this.profileFormGroup.controls["name"].valid;
  }
  get AgeValid() {
    return this.profileFormGroup.controls["age"].valid;
  }
  get EmailValid() {
    return this.profileFormGroup.controls["email"].valid;
  }
  get PasswordValid() {
    return this.profileFormGroup.controls["password"].valid;
  }
  get NewPasswordValid() {
    return this.profileFormGroup.controls["password"].valid;
  }
  get StreetValid() {
    return this.profileFormGroup.controls["street"].valid;
  }
  get CityValid() {
    return this.profileFormGroup.controls["city"].valid;
  }
  get PhoneValid() {
    return this.profileFormGroup.controls["phone"].valid;
  }
  get GenderValid() {
    return this.profileFormGroup.controls["gender"].valid;
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
  Update(name: any, email: any, street: any, city: any, age: any, phone: any, cPassword: any, nPassword: any) {
    const isPasswordMatch = bcrypt.compareSync(cPassword, this.user.password);
    if ((nPassword && nPassword.length >= 8) || !nPassword) {
      if (isPasswordMatch || !cPassword) {
        this.userService.UpdateUser(this.user.email, { name, email, gender: this.user.gender, age, address: { street, city }, phone, password: nPassword ? nPassword : cPassword }).subscribe({
          next: (data) => {
            if (this.profileFormGroup.valid) {
              this.onCloseForm()
            }
            else {
              if (this.profileFormGroup.controls["age"].value == "") {
                this.ageValid = "Age is required"
              }
              if (this.profileFormGroup.controls["name"].value == "") {
                this.nameValid = "Name is required"
              }
              if (this.profileFormGroup.controls["email"].value == "") {
                this.emailValid = "Email is required"
              }
              if (this.profileFormGroup.controls["phone"].value == "") {
                this.phoneValid = "Phone is required"
              }
              if (this.profileFormGroup.controls["street"].value == "") {
                this.streetValid = "Street is required"
              }
              if (this.profileFormGroup.controls["city"].value == "") {
                this.cityValid = "City is required"
              }
              if (this.profileFormGroup.controls["password"].value == "") {
                this.passwordValid = "Password is required"
              }
            }
          },
          error: (err) => { console.log(err) }
        });
      }
      else {
        this.passwordValid = "Incorrect Password";
      }
    }
  }

}
