import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { backendApiUrl } from './config';
import {ItemModel} from "../models/Item.model";

@Injectable({
  providedIn: 'root',
})
export class ItemRequests {
  private itemEndPoint = backendApiUrl + '/api/item/';

  constructor(private http: HttpClient) {}

  getItems(): Observable<ItemModel[]> {
    return this.http.get<ItemModel[]>(this.itemEndPoint);
  }


  deleteItem(itemId: string): Observable<void> {
    const url = `${this.itemEndPoint}${itemId}/`;
    return this.http.delete<void>(url);
  }

  createItem(item: any): Observable<ItemModel> {
    return this.http.post<ItemModel>(this.itemEndPoint, item);
  }

  updateItem(item: any, id : string): Observable<ItemModel> {
    return this.http.put<ItemModel>(this.itemEndPoint + id + '/', item);
  }

}
