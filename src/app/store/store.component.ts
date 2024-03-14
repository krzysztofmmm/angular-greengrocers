import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../services/grocery.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  filterType: string = '';
  sortField: string = '';

  constructor(private groceryService: GroceryService) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.groceryService.getGroceries(this.filterType).subscribe(
      (items) => {
        this.items = items;
        this.filteredItems = this.sortItems([...this.items]);
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }

  addToCart(item: Item): void {
    // Placeholder for add to cart functionality
  }

  filterItems(type: string): void {
    this.filterType = type;
    this.fetchItems();
  }

  sortItems(items: Item[]): Item[] {
    if (!this.sortField) return items;
    return items.sort((a, b) => {
      if (this.sortField === 'price') {
        return a.price - b.price;
      } else if (this.sortField === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }

  setSortField(field: string): void {
    this.sortField = field;
    this.filteredItems = this.sortItems([...this.items]);
  }
}
