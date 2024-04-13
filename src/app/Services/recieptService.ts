import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  get<T>(arg0: string) {
    throw new Error('Method not implemented.');
  }
  private DB_URL = "http://localhost:7500/api/receipt";

  constructor(private http: HttpClient) { }

  getReceipt() {
    return this.http.get(this.DB_URL);
  }
  getRecieptsByMonth(month: any) {
    return this.http.get(this.DB_URL + "/" + month);
  }
  getMonetStat(month: any) {
    return this.http.get(this.DB_URL + "/total/" + month);
  }

  checkout(name: any) {
    return this.http.post('http://localhost:7500/checkout', name);
  }

  getToken(apiKey: any){
    return this.http.post('https://accept.paymob.com/api/auth/tokens', {api_key: apiKey});
  }

  createOrder(token: any, items: any, amount: any){
    return this.http.post('https://accept.paymob.com/api/ecommerce/orders', {auth_token: token, delivery_needed: false, amount_cents: amount, items: items})
  }

  getPaymentToken(token: any, amount: any, id: any, email: any, name: any, street: any, phone: any, city: any){
    return this.http.post('https://accept.paymob.com/api/acceptance/payment_keys', {auth_token: token, amount_cents: amount, expiration: 3600, order_id: id, billing_data: { "apartment": "NA", 
    "email": email, 
    "floor": "NA", 
    "first_name": name, 
    "street": street, 
    "building": "NA", 
    "phone_number": phone, 
    "shipping_method": "NA", 
    "postal_code": "NA", 
    "city": city, 
    "country": "NA", 
    "last_name": "Nicolas", 
    "state": "Utah"}, currency: "EGP", integration_id: "4555715"});
  }
}
