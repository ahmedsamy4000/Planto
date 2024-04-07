import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
  
  constructor(private cart:UserService) {
    console.log(this.selected)
  }

  smallClick(){
    this.size="small"
  }
  meduimClick(){
    this.size="meduim"
  }
  largeClick(){
    this.size="large"
  }
  
  AddtoCart(quantity:any){
    if(localStorage.getItem("Email")){
      if(this.size!="")
        {
          this.cart.UpdateCart({email:localStorage.getItem("Email"),product:this.selected,quantity:quantity})
          console.log("added successfully");
  
        }else
        {
          console.log("select size");
        }
    }else{
      console.log("Please, Login first")
    }
    
  }

}
