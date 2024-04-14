import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedBackService {

  private DB_URL="https://planto-nodejs.onrender.com/api/feedbacks";
  constructor(private http:HttpClient) { }
  addFeedback (feedbackBody:{userID:any,body:any}){
    return this.http.post(this.DB_URL,feedbackBody);
  }
  getFeedBacks(){
    return this.http.get(this.DB_URL);
  }
  
}
