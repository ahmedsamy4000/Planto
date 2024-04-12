import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './Components/Shop/products/products.component';
import { OurStoryComponent } from './Components/our-story/our-story.component';


import { ContactComponent } from './Components/contact/contact.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { ProductComponent } from './Components/Product/product/product.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { SearchResultComponent } from './Components/search-result/search-result.component';
import { CartItemsComponent } from './Components/Card/cart-items/cart-items.component';
import { CartEmptyComponent } from './Components/Card/cart-empty/cart-empty.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { NgModule } from '@angular/core';
import { FeedbacksComponent } from './Components/Feedback/feedbacks/feedbacks.component';
import { userGuard } from './Guards/user.guard';
import { ErrorComponent } from './Components/error/error.component';
import { adminGuard } from './Guards/admin.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'welcome', pathMatch: 'full'},
    {path: "welcome" ,component:WelcomeComponent},
    {path: "shop", component: ProductsComponent},
    {path: "ourStory", component: OurStoryComponent},
    {path: "cartItems",canActivate: [userGuard],  component: CartItemsComponent},
    {path: "cartEmpty",canActivate: [userGuard],  component: CartEmptyComponent},
    {path: "shop/:name", component: ProductComponent},
    {path: "contact", canActivate: [userGuard], component:ContactComponent},
    {path: "profile", canActivate: [userGuard], component:ProfileComponent},
    {path: "dashboard", canActivate: [adminGuard], component:DashboardComponent},
    {path: "searchResults/:name",component:SearchResultComponent},
    {path: "payment", canActivate: [userGuard], component:PaymentComponent},
    {path: "feedbacks",component:FeedbacksComponent},
    {path: "**", component:ErrorComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
