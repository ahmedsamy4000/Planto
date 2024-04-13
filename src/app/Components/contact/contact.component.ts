import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FeedBackService } from '../../Services/feedbackService';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HttpClientModule],
  providers: [FeedBackService,UserService],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{
  userData:any;
  constructor(private feedbackhttp: FeedBackService,private user:UserService) { }
  ngOnInit(): void {
    this.user.GetUserByEmail(localStorage.getItem("Email")).subscribe({
      next:(data)=>{
        this.userData=data
        this.userData=this.userData.data;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  addFeedback(userid: any, body: any) {
    this.feedbackhttp.addFeedback({ userID: userid, body: body }).subscribe({
      next: (value) => { console.log(value); this.closeForm(); this.openAlert(); },
      error: (error) => { console.log(error); }
    });
  }

  openAlert() {
    document.getElementById("alertForm")!.style.display = "block";
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
