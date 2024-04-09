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
  UpdateUser(email: any, user: any){
    return this.http.post(this.DB_URL+'/'+email, user);
  }
  AddToCart(item: any){
    return this.http.post(this.DB_URL+"/cart/add", item);
  }
  GetCart(email: any){
    return this.http.get(this.DB_URL+"/cart/"+email);
  }
  UpdateCart(email: any,cart:any,idx:any){
    return this.http.put(this.DB_URL+"/cart",{email:email,cart:cart,index:idx});
  }
  
  DeleteFromCart(email: any,idx:any){
    return this.http.post(this.DB_URL+"/cart/delete",{email:email,index:idx});
  }
}

