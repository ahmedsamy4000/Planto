import { Component } from '@angular/core';
import { ProductsService } from '../../Services/productsService';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  providers:[ProductsService],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  products: any 

  constructor(private productsService: ProductsService) { }

  async ngOnInit() {
    try {
      const data: any = await this.productsService.getProducts().toPromise();
      this.products = data.data; 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

}
