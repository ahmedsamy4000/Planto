import { Component, Input } from '@angular/core';
import { ProductsService } from '../../../Services/productsService';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule,FormsModule,CommonModule],
  providers: [ProductsService],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {
  imageurl1 = "";
  imageurl2 = "";
@Input() form:any;
  productName = "";

  constructor(private http: ProductsService, private fb: FormBuilder) { }

   Form = this.fb.group({
      name: new FormControl('', [Validators.pattern("^[a-zA-Z ]*$"), Validators.required]),
      price: new FormControl('', [Validators.pattern("^[0-9]*$"), Validators.required]), 
      description: new FormControl('', Validators.required), 
      stock: new FormControl('', [Validators.pattern("^[0-9]*$"), Validators.required]), 
      category: new FormControl('', [Validators.pattern("^(indoor|outdoor|both)$"), Validators.required]), 
      img1: new FormControl('', Validators.required), // 
      img2: new FormControl('', Validators.required),
    });
  
    

  get NameValid() {
    return this.Form.controls["name"].valid;

  }
  
  get PriceValid() {
    return this.Form.controls["price"].valid;
  }
  
  get DescriptionValid() {
    return this.Form.controls["description"].valid;
  }
  
  get StockValid() {
    return this.Form.controls["stock"].valid;
  }
  
  get CategoryValid() {
    return this.Form.controls["category"].valid;
  }
  
  get Img1Valid() {
    return this.Form.controls["img1"].valid;
  }
  
  get Img2Valid() {
    return this.Form.controls["img2"].valid;
  }

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

  AddProduct(name: string,price: string,description: string, stock: string, category: string,img1: any,img2: any){
    
  }
  closeForm(){

  }
}
