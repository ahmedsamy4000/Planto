import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ProductsService } from '../../../Services/productsService';
import { count } from 'rxjs';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [HttpClientModule],
  providers: [ProductsService],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {
  imageurl1 = "";
  imageurl2 = "";

  @Input() Form: any;
  productName = "";
  constructor(private http: ProductsService) { }
  uploadImage1(fileInput1: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const file1 = fileInput1.files[0];
      const formData1 = new FormData();
      formData1.append('image', file1);


      fetch('http://localhost:7500/upload', {
        method: 'POST',
        body: formData1
      })
        .then(response => response.json())
        .then(data => {
          this.imageurl1 = data["imageUrl"];
          resolve();
        })
        .catch(error => {
          console.error('Error:', error);
          reject(error);
        });

    });
  }
  uploadImage2(fileInput2: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const file2 = fileInput2.files[0];
      const formData2 = new FormData();
      formData2.append('image', file2);
      fetch('http://localhost:7500/upload', {
        method: 'POST',
        body: formData2
      })
        .then(response => response.json())
        .then(data => {
          this.imageurl2 = data["imageUrl"];
          resolve();
        })
        .catch(error => {
          console.error('Error:', error);
          reject(error);
        });
    });
  }

  async AddProduct(name: any, price: string, description: any, stock: string, category: any, img1: any, img2: any) {
    await this.uploadImage1(img1);
    await this.uploadImage2(img2);
    this.http.addProduct({
      name: name,
      price: price,
      description: description,
      images: [this.imageurl1, this.imageurl2],
      stock: +stock,
      category: category,
      count: 0,
      rate: 0,
      numberOfRates: 0
    }).subscribe({
      next: (value) => {
        this.closeForm();
      },
      error: (error) => { console.log(error); }
    });
  }
  closeForm() {
    this.Form.style.display = "none";
  }
}
