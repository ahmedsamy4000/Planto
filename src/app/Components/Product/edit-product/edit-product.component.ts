import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ProductsService } from '../../../Services/productsService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  providers:[ProductsService],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  imageurl1="";
  imageurl2="";

  @Input() Form:any;
  @Input() Product:any;
  productName="";
  constructor(private http:ProductsService){}
  uploadImage1(fileInput1:any): Promise<void> {
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
          resolve(); // Resolve the Promise once the image URL has been updated
      })
      .catch(error => {
          console.error('Error:', error);
          reject(error); // Reject the Promise in case of error
      });
      
    });
  }
  uploadImage2(fileInput2:any): Promise<void> {
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
          resolve(); // Resolve the Promise once the image URL has been updated
      })
      .catch(error => {
          console.error('Error:', error);
          reject(error); // Reject the Promise in case of error
      });
    });
  }
  
 async Editproduct (name:any,price:string,description:any,stock:string,category:any,img1:any,img2:any) {
   await this.uploadImage1(img1);
   await this.uploadImage2(img2);

  this.productName=this.Product.name;
  this.Product.name=name;
  this.Product.price=price;
  this.Product.description=description;
  this.Product.images=[this.imageurl1!=undefined?this.imageurl1:this.Product.images[0],this.imageurl2!=undefined?this.imageurl2:this.Product.images[1]];
  this.Product.stock=+stock;
  this.Product.category=category;
  delete this.Product._id; 
  delete this.Product.__v;
  console.log(this.Product);
    this.http.updateProduct(this.productName,this.Product).subscribe({
      next:(value)=>{
        console.log(value);
        console.log(this.imageurl1);
        console.log(this.imageurl2);
        this.closeForm();
      },
      error:(error)=>{console.log(error);}
    }); 
}
closeForm(){
  this.Form.style.display = "none";
}
}
