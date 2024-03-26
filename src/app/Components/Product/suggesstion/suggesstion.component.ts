import { Component, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-suggesstion',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './suggesstion.component.html',
  styleUrl: './suggesstion.component.css'
})
export class SuggesstionComponent {
  products: any = ['Palm', 'Snake', 'Orchid', 'Maiden Hair', 'Alocasia'];
  i = 1;
  onMouseOver(){
    this.i = 2;
  }
  onMouseOut(){
    this.i = 1;
  }
}
