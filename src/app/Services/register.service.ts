import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private DB_URL="https://planto-nodejs.onrender.com/api/register";
  constructor(private http:HttpClient) { }
  register (user:any){
    return this.http.post(this.DB_URL,user);
  }
  
}
