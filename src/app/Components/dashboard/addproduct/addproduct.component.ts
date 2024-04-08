import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductsService } from '../../../Services/productsService';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [HttpClientModule],
  providers:[ProductsService],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {
  imageurl="heyyy";
  constructor(private http:ProductsService){}
  uploadImage(): Promise<void> {
    return new Promise((resolve, reject) => {
      const fileInput:any = document.getElementById('fileInput');
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append('image', file);

      fetch('http://localhost:7500/upload', {
          method: 'POST',
          body: formData
      })
      .then(response => response.json())
      .then(data => {
          this.imageurl = data["imageUrl"];
          resolve(); // Resolve the Promise once the image URL has been updated
      })
      .catch(error => {
          console.error('Error:', error);
          reject(error); // Reject the Promise in case of error
      });
    });
  }
 async addproduct (name:any,price:string,description:any,stock:string,category:any) {
await this.uploadImage();
  console.log(this.imageurl);
    this.http.addProduct({
      name:name,
      price:price,
      description:description,
      images:[this.imageurl],
      stock:+stock,
      category:category,
      count:2,
      rate:3
    }).subscribe({
      next:(value)=>{console.log(value);
        console.log(this.imageurl);
      },
      error:(error)=>{console.log(error);}
    });
    
}
}
