import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../models/item';

interface CartItem {
  item: Item;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);

  getCartItems() {
    return this.cartItems.asObservable();
  }

  addItemToCart(item: Item) {
    const currentItems = this.cartItems.getValue();
    const itemIndex = currentItems.findIndex(
      (cartItem) => cartItem.item.id === item.id
    );

    if (itemIndex > -1) {
      currentItems[itemIndex].quantity += 1;
    } else {
      currentItems.push({ item, quantity: 1 });
    }

    this.cartItems.next(currentItems);
  }

  updateItemQuantity(item: Item, change: number) {
    const currentItems = this.cartItems.getValue();
    const itemIndex = currentItems.findIndex(
      (cartItem) => cartItem.item.id === item.id
    );

    if (itemIndex > -1) {
      const updatedQuantity = currentItems[itemIndex].quantity + change;
      if (updatedQuantity > 0) {
        currentItems[itemIndex].quantity = updatedQuantity;
      } else {
        currentItems.splice(itemIndex, 1); // Remove the item if quantity is 0
      }

      this.cartItems.next(currentItems);
    }
  }

  getTotalPrice(): number {
    const currentItems = this.cartItems.getValue();
    return currentItems.reduce((total, cartItem) => {
      return total + cartItem.item.price * cartItem.quantity;
    }, 0);
  }
}
