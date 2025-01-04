import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { backendApiUrl } from './config';
import {Owner} from "../models/Owner.model";

@Injectable({
  providedIn: 'root',
})
export class OwnerRequests {
  private ownerEndPoint = backendApiUrl + '/api/owner/';

  constructor(private http: HttpClient) {}

  getOwners(): Observable<Owner[]> {
    return this.http.get<Owner[]>(this.ownerEndPoint);
  }


  deleteOwner(ownerId: string): Observable<void> {
    const url = `${this.ownerEndPoint}${ownerId}/`;
    return this.http.delete<void>(url);
  }

  createOwner(owner: any): Observable<Owner> {
    return this.http.post<Owner>(this.ownerEndPoint, owner);
  }

  updateOwner(owner: any, id : string): Observable<Owner> {
    return this.http.put<Owner>(this.ownerEndPoint + id + '/', owner);
  }

}
