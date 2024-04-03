import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private DB_URL = "http://localhost:7500/api/products";

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get(this.DB_URL);
  }
  getOneProduct(name:string){
        return this.http.get(this.DB_URL+"/"+name);
    }
  

}
