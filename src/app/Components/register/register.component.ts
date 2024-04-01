import { Component } from '@angular/core';
import { RegisterService } from '../../Services/register.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule],
  providers:[RegisterService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private register:RegisterService){}
user={
  name:"Doha",
  password:"ABC12345",
  email:"mera@gmail.com",
  gender:"F",
  age:22,
  address:{
      street:"aaa",
      city:"Minya"
  }
}

onRegister(){
  this.register.register(this.user).subscribe({
    next:(data)=>{console.log(data)},
    error:(err)=>{console.log(err)}
  });
}


}
