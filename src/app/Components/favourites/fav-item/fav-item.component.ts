import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-fav-item',
  standalone: true,
  imports: [HttpClientModule,RouterModule,CommonModule],
  providers:[UserService],
  templateUrl: './fav-item.component.html',
  styleUrl: './fav-item.component.css'
})
export class FavItemComponent implements OnInit{
  @Input() item:any
  @Input() idx:any
  totalPrice=0
  constructor(private fav:UserService){}
  ngOnInit(): void {
    this.totalPrice=this.item.product.price
  }
  deleteItem(){
    this.fav.DeleteFromFavourites(this.idx).subscribe({
      next:(data)=>{
        location.reload();
      },
      error:(err)=>{console.log(err)}
    });
  }

}
