import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../Services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../../Services/productsService';
import { EditProductComponent } from '../edit-product/edit-product.component';


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
  isAdmin:any;
  constructor(private cart:UserService,private producthttp:ProductsService, private router:Router) {
    this.isAdmin=localStorage.getItem("isAdmin");
  }

  smallClick(){
    this.size="Small"
  }
  meduimClick(){
    this.size="Meduim"
  }
  largeClick(){
    this.size="Large"
  }
  
  AddtoCart(quantity:any){
    if(localStorage.getItem("Email")){
      if(this.size!="")
        {
          
          if(this.selected.stock>=quantity.value&&quantity.value>0){
          console.log(localStorage.getItem("Email"))
          console.log(this.selected)
          console.log(quantity)

          this.cart.AddToCart({email:localStorage.getItem("Email"),product:this.selected,quantity:+quantity.value,size:this.size}).subscribe({
            next:(data)=>{},
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
