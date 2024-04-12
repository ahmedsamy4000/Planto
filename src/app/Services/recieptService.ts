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


}
