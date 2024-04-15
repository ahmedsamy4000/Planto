import { Component, OnInit } from '@angular/core';
import { FeedBackService } from '../../../Services/feedbackService';
import { HttpClientModule } from '@angular/common/http';
import { FeedbackEmptyComponent } from '../feedback-empty/feedback-empty.component';
import { FeedbackItemComponent } from '../feedback-item/feedback-item.component';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-feedbacks',
  standalone: true,
  imports: [FeedbackEmptyComponent, FeedbackItemComponent, HttpClientModule, CommonModule],
  providers: [FeedBackService],
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.css'
})
export class FeedbacksComponent implements OnInit {
  feedbacks: any;
  formattedDate: string = '';
  constructor(private feedbackhttp: FeedBackService) { }
  ngOnInit(): void {
    this.feedbackhttp.getFeedBacks().subscribe({
      next: (data) => {
        this.feedbacks = data;
        this.feedbacks = this.feedbacks.data;

        for (var i of this.feedbacks) {
          const date = new Date(i.date);

          // Format the date using Angular's DatePipe
          // this.formattedDate = this.datePipe.transform(date, 'medium') || '';
          this.formattedDate = i.date.substring(0, 10);

          i.date = this.formattedDate;

        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
