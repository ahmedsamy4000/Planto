import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule,LoginComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  loginFormVisible=false
  constructor(private router:Router){}
  OnClick(name:string){
    this.router.navigate(["/searchResults/"+name]).then(page => { window.location.reload(); });
  }
  ProfileClick(){
    if(localStorage.getItem("userToken"))
      {
        this.router.navigateByUrl("/profile");
      }else{
        this.toggleLoginForm();
      }
  }
  ShopClick(){
    this.router.navigateByUrl("/shop");
  }
  ContactClick(){
    if(localStorage.getItem("userToken"))
      {
        this.router.navigateByUrl("/contact");
      }else{
        this.toggleLoginForm();
      }
  }
  toggleLoginForm() {
    this.loginFormVisible = !this.loginFormVisible;
  }
}
