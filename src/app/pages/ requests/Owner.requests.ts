import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { backendApiUrl } from './config';
import {OwnerModel} from "../models/Owner.model";

@Injectable({
  providedIn: 'root',
})
export class OwnerRequests {
  private ownerEndPoint = backendApiUrl + '/api/owner/';

  constructor(private http: HttpClient) {}

  getOwners(): Observable<OwnerModel[]> {
    return this.http.get<OwnerModel[]>(this.ownerEndPoint);
  }


  deleteOwner(ownerId: string): Observable<void> {
    const url = `${this.ownerEndPoint}${ownerId}/`;
    return this.http.delete<void>(url);
  }

  createOwner(owner: any): Observable<OwnerModel> {
    return this.http.post<OwnerModel>(this.ownerEndPoint, owner);
  }

  updateOwner(owner: any, id : string): Observable<OwnerModel> {
    return this.http.put<OwnerModel>(this.ownerEndPoint + id + '/', owner);
  }

}
