import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class GroceryService {
  private apiUrl = 'https://boolean-api-server.fly.dev/groceries';

  constructor(private http: HttpClient) {}

  getGroceries(type?: string): Observable<Item[]> {
    let params = {};
    if (type) {
      params = { type: type };
    }
    return this.http.get<Item[]>(this.apiUrl, { params: params });
  }
}
