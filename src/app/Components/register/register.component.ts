import { Component } from '@angular/core';
import { RegisterService } from '../../Services/register.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule],
  providers: [RegisterService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private register: RegisterService) { }

  onRegister(name: any, email: any, age: any, password: any) {
    this.register.register({ name, password, email, gender: "F", age, address: { street: "aaa", city: "Minya" } }).subscribe({
      next: (data) => { console.log(data) },
      error: (err) => { console.log(err) }
    });
  }


}
