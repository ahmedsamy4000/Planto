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
  GetUserByID (id:any){
    return this.http.get(this.DB_URL+'/id/'+id);
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

