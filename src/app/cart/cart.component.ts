import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: { item: Item; quantity: number }[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
  }

  addItem(item: Item): void {
    this.cartService.addItemToCart(item);
  }

  removeItem(item: Item): void {
    this.cartService.updateItemQuantity(item, -1);
  }

  updateQuantity(item: Item, change: number): void {
    this.cartService.updateItemQuantity(item, change);
  }
}
