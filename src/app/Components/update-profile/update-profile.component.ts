import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule],
  providers: [UserService],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent implements OnChanges{
  gender: any;
  @Input() user: any;
  @Output() closeForm = new EventEmitter();
  onCloseForm() {
    this.closeForm.emit();
  }

  registerFormGroup: any
  constructor(private router: Router, private userService: UserService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.registerFormGroup = new FormGroup({
      name: new FormControl(this.user.name, [Validators.pattern("^[a-z A-Z]*$"), Validators.required]),
      email: new FormControl(this.user.email, [Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"), Validators.required]),
      password: new FormControl('', [Validators.minLength(8), Validators.required]),
      age: new FormControl(this.user.age, [Validators.required]),
      street: new FormControl(this.user.street, [Validators.required]),
      city: new FormControl(this.user.city, [Validators.required]),
      phone: new FormControl(this.user.phone, [Validators.pattern("^(010|011|012|015)[0-9]{8}$"), Validators.required]),
      gender: new FormControl('', [Validators.required]),
    });
    this.gender=this.user.gender;
  }


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
  Update(name: any, email: any, street: any, city: any, age: any, phone: any) {
    this.userService.UpdateUser(this.user.email,{ name, email, gender: this.gender, age, address: { street, city }, phone, password: "12345678"}).subscribe({
      next: (data) => {
        if (this.registerFormGroup.valid) {
          console.log(data);
          this.onCloseForm()
        }
        else {
          if (this.registerFormGroup.controls["age"].value == "") {
            this.ageValid = "Age is required"
          }
          if (this.registerFormGroup.controls["name"].value == "") {
            this.nameValid = "Name is required"
          }
          if (this.registerFormGroup.controls["email"].value == "") {
            this.emailValid = "Email is required"
          }
          if (this.registerFormGroup.controls["phone"].value == "") {
            this.phoneValid = "Phone is required"
          }
          if (this.registerFormGroup.controls["street"].value =="") {
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
