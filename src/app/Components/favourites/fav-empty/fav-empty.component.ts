import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-fav-empty',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './fav-empty.component.html',
  styleUrl: './fav-empty.component.css'
})
export class FavEmptyComponent {
  constructor(private router:Router){}
  goToShop(){
    this.router.navigate(['/shop']);
  }
}
