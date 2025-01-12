import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnimalModel } from '../models/Animal.model';
import { backendApiUrl } from './config';

@Injectable({
  providedIn: 'root',
})
export class AnimalRequests {
  private animalEndPoint = backendApiUrl + '/api/animal/';

  constructor(private http: HttpClient) {}

  getAnimals(): Observable<AnimalModel[]> {
    return this.http.get<AnimalModel[]>(this.animalEndPoint);
  }

  deleteAnimal(animalId: string): Observable<void> {
    const url = `${this.animalEndPoint}${animalId}/`;
    return this.http.delete<void>(url);
  }

  createAnimal(animal: any): Observable<AnimalModel> {
    return this.http.post<AnimalModel>(this.animalEndPoint, animal);
  }

  updateAnimal(animal: any, id : string): Observable<AnimalModel> {
    return this.http.put<AnimalModel>(this.animalEndPoint + id + '/', animal);
  }

}
