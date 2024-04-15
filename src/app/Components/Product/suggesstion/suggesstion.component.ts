import { CommonModule } from '@angular/common';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../../Services/productsService';

@Component({
  selector: 'app-suggesstion',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './suggesstion.component.html',
  styleUrl: './suggesstion.component.css'
})
export class SuggesstionComponent{
  products: any;
  currentimg = ""
  constructor( private productsService: ProductsService){}
  ngOnInit() {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.products = this.products.data;
        this.products.sort((a: any, b: any) => b["count"] - a["count"]);
        this.products = this.products.slice(0, 3);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  }

