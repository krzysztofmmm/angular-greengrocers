// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreComponent } from './store/store.component';
import { CartComponent } from './cart/cart.component';
import { TotalComponent } from './total/total.component';
import { GroceryService } from './services/grocery.service';
import { CartService } from './services/cart.service';

@NgModule({
  declarations: [AppComponent, StoreComponent, CartComponent, TotalComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [GroceryService, CartService],
  bootstrap: [AppComponent],
})
export class AppModule {}
