import { Routes } from '@angular/router';
import { ProductsComponent } from './Components/Shop/products/products.component';
import { OurStoryComponent } from './Components/our-story/our-story.component';
import { CartItemsComponent } from './Components/cart-items/cart-items.component';
import { CartEmptyComponent } from './Components/cart-empty/cart-empty.component';
import { ProductComponent } from './Components/Shop/product/product.component';

export const routes: Routes = [
    {path: "shop", component: ProductsComponent},
    {path: "ourStory", component: OurStoryComponent},
    {path: "cartItems", component: CartItemsComponent},
    {path: "cartEmpty", component: CartEmptyComponent},
    {path: "shop/:name", component: ProductComponent}



];
