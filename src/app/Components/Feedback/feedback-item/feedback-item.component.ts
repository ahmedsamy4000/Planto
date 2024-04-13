import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-feedback-item',
  standalone: true,
  imports: [HttpClientModule],
  providers:[UserService],
  templateUrl: './feedback-item.component.html',
  styleUrl: './feedback-item.component.css'
})
export class FeedbackItemComponent implements OnInit{
  @Input() item:any;
  userData:any;
  constructor(private user:UserService){}
  ngOnInit(): void {
  this.user.GetUser().subscribe({
    next:(data)=>{
      this.userData=data;
      this.userData=this.userData.data;
      console.log(data)
    },
    error:(err)=>{
      console.log(err);
    }
  });
  }

}
