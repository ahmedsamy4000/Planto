import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FeedBackService } from '../../Services/feedbackService';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HttpClientModule],
  providers:[FeedBackService],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
constructor(private feedbackhttp:FeedBackService){}
addFeedback(userid:any,body:any){
this.feedbackhttp.addFeedback({userID:userid,body:body}).subscribe({
  next:(value)=>{console.log(value);this.closeForm();this.openAlert();},
  error:(error)=>{console.log(error);}
});
}

openAlert(){
  document.getElementById("alertForm")!.style.display="block";
}
closeAlert() {
  document.getElementById("alertForm")!.style.display = "none";
}
 openForm() {
    document.getElementById("contactForm")!.style.display = "block";
  }

   closeForm() {
    document.getElementById("contactForm")!.style.display = "none";
  }

}
