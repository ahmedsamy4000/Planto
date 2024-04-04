import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  private DB_URL = "http://localhost:7500/api/receipt";

  constructor(private http: HttpClient) { }

  getReceipt(){
    return this.http.get(this.DB_URL);
  }
  getRecieptsByMonth(month:any){
        return this.http.get(this.DB_URL+"/"+month);
    }
  

}
