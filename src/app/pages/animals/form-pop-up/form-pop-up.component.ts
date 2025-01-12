import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import {AnimalRequests} from "../../ requests/Animal.requests";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatOption, MatSelect} from "@angular/material/select";
import {Observable} from "rxjs";
import {Owner} from "../../models/Owner.model";
import {OwnerRequests} from "../../ requests/Owner.requests";

@Component({
  selector: 'app-form-pop-up',
  templateUrl: './form-pop-up.component.html',
  styleUrls: ['./form-pop-up.component.css'],
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatButton,
    NgIf,
    MatError,
    MatSelect,
    MatOption,
    NgForOf,
    AsyncPipe,
  ],
  standalone: true,
})
export class FormPopUpComponent implements OnInit{
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() animal: any = null;
  @Output() close = new EventEmitter<void>();

  animalForm: FormGroup;
  selectedFile: File | null = null;
  owners!: Observable<Owner[]>;

  constructor(private fb: FormBuilder, private animalRequests: AnimalRequests, private ownerRequests: OwnerRequests) {
    this.animalForm = this.fb.group({
      name: ['', []],
      species: ['', []],
      picture: [null],
      owner: ['', []],
    });
  }

  ngOnInit(): void {
    this.loadOwners();

    if (this.mode === 'edit' && this.animal) {
      this.animalForm.patchValue({
        name: this.animal.name,
        species: this.animal.species,
        picture: null,
        owner: this.animal.owner,
      });
    }
  }

  loadOwners(): void {
    this.owners = this.ownerRequests.getOwners();
  }

  onSubmit(): void {
    if (this.animalForm.valid) {
      const formData = new FormData();
      formData.append('name', this.animalForm.get('name')?.value);
      formData.append('species', this.animalForm.get('species')?.value);
      formData.append('owner', this.animalForm.get('owner')?.value);

      if (this.selectedFile) {
        formData.append('picture', this.selectedFile, this.selectedFile.name);
      }

      if (this.mode === 'create') {
        this.animalRequests.createAnimal(formData).subscribe({
          next: (response) => {
            this.close.emit();
          },
          error: (err: any) => {
            console.error('Error creating animal:', err);
          },
        });
      } else if (this.mode === 'edit') {
        this.animalRequests.updateAnimal(formData, this.animal.aid).subscribe({
          next: (response) => {
            this.close.emit();
          },
          error: (err: any) => {
            console.error('Error updating animal:', err);
          }
        });
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }
}
