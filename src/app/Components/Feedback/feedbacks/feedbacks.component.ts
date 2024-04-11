import { Component, OnInit } from '@angular/core';
import { FeedBackService } from '../../../Services/feedbackService';
import { HttpClientModule } from '@angular/common/http';
import { FeedbackEmptyComponent } from '../feedback-empty/feedback-empty.component';
import { FeedbackItemComponent } from '../feedback-item/feedback-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedbacks',
  standalone: true,
  imports: [FeedbackEmptyComponent,FeedbackItemComponent,HttpClientModule,CommonModule],
  providers:[FeedBackService],
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.css'
})
export class FeedbacksComponent implements OnInit{
  feedbacks:any;
  constructor(private feedbackhttp:FeedBackService){}
  ngOnInit(): void {
    this.feedbackhttp.getFeedBacks().subscribe({
      next:(data)=>{
        this.feedbacks=data;
        this.feedbacks=this.feedbacks.data;
        console.log(this.feedbacks);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
  
}
