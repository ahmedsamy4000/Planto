import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private DB_URL="https://planto-nodejs.onrender.com/api/login";
  constructor(private http:HttpClient) { }
  login (user:any): Observable<any>{
    return this.http.post<any>(this.DB_URL,user,{observe:'response'});
  }
}
