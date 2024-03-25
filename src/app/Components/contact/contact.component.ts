import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

 openForm() {
    document.getElementById("contactForm")!.style.display = "block";
  }

   closeForm() {
    document.getElementById("contactForm")!.style.display = "none";
  }

}
