import { Component } from '@angular/core';
import { OneProductComponent } from '../Shop/one-product/one-product.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/productsService';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [OneProductComponent, CommonModule,HttpClientModule],
  providers:[ProductsService,UserService],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {

  products:any;
  name=""
  searchValue=""
  userName=""
  constructor(private myActivated: ActivatedRoute, private productsService: ProductsService, private user:UserService) {
    this.name = this.myActivated.snapshot.params['name'];
    this.searchValue=this.name;
  }
   ngOnInit() {
    try {
      if(this.name=="Outdoor"||this.name=="Indoor"||this.name=="Both"){
        this.productsService.searchByCategory(this.name).subscribe({
          next:(data)=>{
            this.products=data;
          },
          error:(err)=>{
            console.log(err)
          }
        })
      }else{
        this.productsService.searchByName(this.name).subscribe({
          next:(data)=>{
            this.products=data;
          },
          error:(err)=>{
            console.log(err)
          }
        })
      }
      this.user.GetUser().subscribe({
        next:(data:any)=>{
          this.userName=data.data.name;
        }
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  sortHighToLow(){
    this.products.sort((a:any, b:any) =>  b.price-a.price);
  }
  sortLowToHigh(){
    this.products.sort((a:any, b:any) => a.price - b.price);
  }

}
