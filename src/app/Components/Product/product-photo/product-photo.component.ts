import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductRateComponent } from '../product-rate/product-rate.component';
import { ProductsService } from '../../../Services/productsService';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-photo',
  standalone: true,
  imports: [HttpClientModule, RouterModule, ProductRateComponent],
  providers: [ProductsService],
  templateUrl: './product-photo.component.html',
  styleUrl: './product-photo.component.css'
})
export class ProductPhotoComponent {
  @Input() imgs="";
  current=""
  // constructor() {
   

  // }
  
  product:any;
  name = "";
  // constructor(private producthttp:ProductsService,private user:UserService) { }
  // ngOnInit(): void {
  //   this.user.GetUserByEmail(localStorage.getItem("Email")).subscribe({
  //     next:(data)=>{
  //       this.userData=data
  //       this.userData=this.userData.data;
  //     },
  //     error:(err)=>{
  //       console.log(err)
  //     }
  //   })
  // }


  constructor(private myActivated: ActivatedRoute, private productsService: ProductsService) {
    this.name = this.myActivated.snapshot.params['name'];
  }
  ngOnInit() {
    try {
      this.productsService.getOneProduct(this.name).subscribe({
        next:(data)=>{
          console.log(data)
          
          this.product=data;
          this.product=this.product.data;
          console.log(this.product)

        },
        error:(err)=>{
          console.log(err)
        }
      })
       
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.current = this.imgs[0];
  }

  next() {
    this.current=this.imgs[1]
  }

  previous() {
    this.current=this.imgs[0]
  }
}
