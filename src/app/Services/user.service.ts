import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private DB_URL="http://localhost:7500/api/user";
  private headers: any = {
    token: localStorage.getItem('userToken')
  }
  constructor(private http:HttpClient) { }
  GetUser (){
    return this.http.get(this.DB_URL, {headers: this.headers});
  }
  UpdateUser(user: any){
    return this.http.put(this.DB_URL, user, {headers: this.headers});
  }
  AddToCart(item: any){
    return this.http.post(this.DB_URL+"/cart/add", item, {headers: this.headers});
  }
  GetCart(){
    return this.http.get(this.DB_URL+"/get/cart", {headers: this.headers});
  }
  UpdateCart(cart:any,idx:any){
    return this.http.put(this.DB_URL+"/cart",{cart:cart,index:idx}, {headers: this.headers});
  }
  
  DeleteFromCart(idx:any){
    return this.http.post(this.DB_URL+"/cart/delete",{index:idx}, {headers: this.headers});
  }

  DeleteCart(){
    return this.http.delete(this.DB_URL+"/cart/alldelete", {headers: this.headers});
  }

  
  AddToFavourites(item: any){
    return this.http.post(this.DB_URL+"/favourites/add", item);
  }
  GetFavourites(email: any){
    return this.http.get(this.DB_URL+"/favourites/"+email);
  }
  UpdateFavourites(email: any,fav:any,idx:any){
    return this.http.put(this.DB_URL+"/favourites",{email:email,fav:fav,index:idx});
  }

  DeleteFromFavourites(email: any,idx:any){
    return this.http.post(this.DB_URL+"/favourites/delete",{email:email,index:idx});
  }
}

