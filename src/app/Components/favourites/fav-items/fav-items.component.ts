import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../Services/user.service';
import { FavItemComponent } from '../fav-item/fav-item.component';
import { FavEmptyComponent } from '../fav-empty/fav-empty.component';

@Component({
  selector: 'app-fav-items',
  standalone: true,
  imports: [CommonModule,RouterModule,FavItemComponent,FavEmptyComponent],
  providers:[UserService],
  templateUrl: './fav-items.component.html',
  styleUrl: './fav-items.component.css'
})
export class FavItemsComponent implements OnInit{
flag=0
items:any
Price:any
outputPrice:number=0
i:any

constructor(private user:UserService,private router:Router){}

  ngOnInit(): void {
   this.user.GetFavourites().subscribe({
    next:(data)=>{
      this.items=data;
      this.items=this.items.data;
      this.flag=this.items.length>0?1:0;
      for(let item of this.items){
        this.i=item;
        this.Price=this.i.product.price;
      }
    },
    error:(err)=>{
      console.log(err)
    }
   })
  }

}
