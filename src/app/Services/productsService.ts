import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private DB_URL = "http://localhost:7500/api/products";

  constructor(private http: HttpClient) { }


  addProduct(productBody: any) {
    return this.http.post(this.DB_URL, productBody);
  }
  getProducts() {
    return this.http.get(this.DB_URL);
  }
  getOneProduct(name: string) {
    return this.http.get(this.DB_URL + "/" + name);
  }
  searchByName(name: string) {
    return this.http.get(this.DB_URL + "/search/" + name)
  }
  updateProduct(name: string, product: any) {
    return this.http.put(this.DB_URL + "/" + name, product);
  }
  deleteProduct(name: string) {
    return this.http.delete(this.DB_URL + "/" + name);
  }
  calcProductRate(name: string, rate: any) {
    return this.http.put(this.DB_URL + "/rate/" + name, {rate});
  }
}
