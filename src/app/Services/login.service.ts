import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private DB_URL="http://localhost:7500/api/login";
  constructor(private http:HttpClient) { }
  login (user:any){
    return this.http.post(this.DB_URL,user);
  }
}
