import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  constructor(router: Router, activated: ActivatedRoute){
    if(activated.snapshot.queryParams['success']){
      location.assign('https://plantoo.vercel.app/success2')
    }
  }
}
