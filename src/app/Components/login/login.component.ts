import { Component, EventEmitter, Output } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RegisterComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  registerFormVisible = false;
  @Output() closeForm = new EventEmitter();
  onCloseForm(){
    this.closeForm.emit();
  }
  toggleRegisterForm() {
    this.registerFormVisible = !this.registerFormVisible;
  }
}
