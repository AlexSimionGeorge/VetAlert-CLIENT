import { Component, OnInit } from '@angular/core';
import { AnimalModel } from '../models/Animal.model';
import { AsyncPipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { Observable } from 'rxjs';
import { FormPopUpComponent } from './form-pop-up/form-pop-up.component';
import {AnimalRequests} from "../ requests/Animal.requests";
import {MatButton} from "@angular/material/button";
import {TreatmentLogComponent} from "./treatment-log/treatment-log.component";

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
    TreatmentLogComponent,
  ],
})
export class AnimalsComponent implements OnInit {
  animals$!: Observable<AnimalModel[]>;
  isNewUpdateModalOpen = false;
  isTreatmentLogModalOpen:boolean = false;
  modalNewUpdateMode: 'create' | 'edit' = 'create';
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

  openNewUpdateModal(mode: 'create' | 'edit', animal: any = null) {
    this.isNewUpdateModalOpen = true;
    this.modalNewUpdateMode = mode;
    this.selectedAnimal = animal;
  }

  closeNewUpdateModal() {
    this.isNewUpdateModalOpen = false;
    this.loadAnimals();
  }

  openTreatmentLogModal(animal: AnimalModel) {
    this.isTreatmentLogModalOpen = true;
    this.selectedAnimal = animal;
  }

  closeTreatmentLogModal() {
    this.isTreatmentLogModalOpen = false;
  }
}
