import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../Services/user.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,RouterModule,HttpClientModule],
  providers: [UserService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  // @Input() name = "";
  // @Input() description = "";
  // @Input() price = "";
  // @Input() category = "";
  @Input() selected:any;
  size="";
  message="";
  constructor(private cart:UserService) {
    console.log(this.selected)
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

}
