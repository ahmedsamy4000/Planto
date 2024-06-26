import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../Services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../../Services/productsService';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,RouterModule,HttpClientModule,EditProductComponent],
  providers: [UserService,ProductsService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  @Input() selected:any;
  size="";
  message="";
  price:number | undefined;
  isAdmin:any;
  constructor(private cart:UserService,private producthttp:ProductsService, private router:Router,private fav:UserService) {
    if (localStorage.getItem("userToken")) {
      interface MyToken {
        email: string;
        id: string;
        isAdmin: string;
        iat:number
      };
      const decodedToken = jwtDecode<MyToken>(localStorage.getItem("userToken")!);
      this.isAdmin = decodedToken.isAdmin;
    }
  }
  
 ngOnInit(): void {
  this.price = +this.selected.price;
}

smallClick(){
  this.price=+this.selected.price
  this.size="small"
}
meduimClick(){
  this.price=parseInt(this.selected.price)+100
  this.size="meduim"

}
largeClick(){
  this.price=parseInt(this.selected.price)+200
  this.size="large"

}

  AddToFavourites(){
    if(!localStorage.getItem("userToken")){
      this.message="Please, Login first";
    }
    this.fav.AddToFavourites({product:this.selected}).subscribe({
      next:(data:any)=>{
        if(data.message==0){
          this.message="Product Already Exist"
        }else{
          this.message="Added To Favourites"
        }
      },
      error:(err)=>{
        console.log(err);
      }
    }) 
  }
  AddtoCart(quantity:any,productPrice:any){
    if(localStorage.getItem("userToken")){
      if(this.size!="")
        {
          
          if(this.selected.stock>=quantity.value&&quantity.value>0){
          this.cart.AddToCart({product:this.selected,quantity:+quantity.value,size:this.size,price:productPrice}).subscribe({
            next:(data)=>{
            },
            error:(err)=>{}
          })
          this.message="Added Successfully";
          console.log("added successfully");

        }else{
          this.message="Quantity Unavailable";
        }
        }else
        {
          this.message="Select Size";
          console.log("select size");
        }
    }else{
      this.message="Please, Login first";
      console.log("Please, Login first")
    }
    
  }

  EditProduct(editProduct:any){
    editProduct.style.display = "flex";
  }
  DeleteProduct(){
    this.producthttp.deleteProduct(this.selected.name).subscribe({});
    this.router.navigate(["/shop"])
  }
  
  
}
