import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(private router:Router){}
  OnClick(name:string){
    this.router.navigate(["/searchResults/"+name]).then(page => { window.location.reload(); });
  }
}
