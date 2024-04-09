import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ContactComponent } from './Components/contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent,FooterComponent ,RouterOutlet,ContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  user:any;
  constructor(private router: Router) { } 
  GetUser(user: any){
    // console.log(user.data);
    this.user = user.data;
  }
    ngOnInit() { 
        this.router.events.subscribe((event) => { 
            if (!(event instanceof NavigationEnd)) { 
                return; 
            } 
            window.scrollTo(0, 0) 
        }); 
    } 
}
