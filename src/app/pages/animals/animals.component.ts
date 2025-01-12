import { Component, OnInit } from '@angular/core';
import { AnimalModel } from '../models/Animal.model';
import { AsyncPipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { Observable } from 'rxjs';
import { FormPopUpComponent } from './form-pop-up/form-pop-up.component';
import {AnimalRequests} from "../ requests/Animal.requests";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css'],
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    NgIf,
    AsyncPipe,
    FormPopUpComponent,
    MatButton,
  ],
})
export class AnimalsComponent implements OnInit {
  animals$!: Observable<AnimalModel[]>;
  isModalOpen = false;
  modalMode: 'create' | 'edit' = 'create';
  selectedAnimal: any = null;

  constructor(private animalRequests: AnimalRequests) {}

  ngOnInit(): void {
    this.loadAnimals();
  }

  loadAnimals(): void {
    this.animals$ = this.animalRequests.getAnimals();
  }

  deleteAnimal(animalId: string): void {
    this.animalRequests.deleteAnimal(animalId).subscribe({
      next: (delresp) => {
        this.loadAnimals();
      },
      error: (error: any) => {
        console.error('Error deleting animal:', error);
      },
    });
  }

  openModal(mode: 'create' | 'edit', animal: any = null) {
    this.isModalOpen = true;
    this.modalMode = mode;
    this.selectedAnimal = animal;
  }

  closeModal() {
    this.isModalOpen = false;
    this.loadAnimals();
  }
}
