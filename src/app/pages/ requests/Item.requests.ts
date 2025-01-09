import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { backendApiUrl } from './config';
import {Item} from "../models/Item.model";

@Injectable({
  providedIn: 'root',
})
export class ItemRequests {
  private itemEndPoint = backendApiUrl + '/api/item/';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemEndPoint);
  }


  deleteItem(itemId: string): Observable<void> {
    const url = `${this.itemEndPoint}${itemId}/`;
    return this.http.delete<void>(url);
  }

  createItem(item: any): Observable<Item> {
    return this.http.post<Item>(this.itemEndPoint, item);
  }

  updateItem(item: any, id : string): Observable<Item> {
    return this.http.put<Item>(this.itemEndPoint + id + '/', item);
  }

}
