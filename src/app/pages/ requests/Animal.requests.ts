import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../models/Animal.model';
import { backendApiUrl } from './config';

@Injectable({
  providedIn: 'root',
})
export class AnimalRequests {
  private animalEndPoint = backendApiUrl + '/api/animal/';

  constructor(private http: HttpClient) {}

  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.animalEndPoint);
  }

  deleteAnimal(animalId: string): Observable<void> {
    const url = `${this.animalEndPoint}${animalId}/`;
    return this.http.delete<void>(url);
  }

  createAnimal(animal: any): Observable<Animal> {
    return this.http.post<Animal>(this.animalEndPoint, animal);
  }

  updateAnimal(animal: any, id : string): Observable<Animal> {
    return this.http.put<Animal>(this.animalEndPoint + id + '/', animal);
  }

}
