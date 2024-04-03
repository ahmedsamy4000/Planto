import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private DB_URL="http://localhost:7500/api/user";
  constructor(private http:HttpClient) { }
  GetUserByEmail (email:any){
    return this.http.get(this.DB_URL+'/'+email);
  }
}
