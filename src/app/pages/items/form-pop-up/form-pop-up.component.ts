import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ItemRequests} from "../../ requests/Item.requests";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-form-pop-up-items',
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './form-pop-up.component.html',
  styleUrl: './form-pop-up.component.css'
})
export class FormPopUpComponent {
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() item: any = null;
  @Output() close = new EventEmitter<void>();

  itemForm: FormGroup;
  constructor(private fb: FormBuilder, private itemRequests: ItemRequests) {
    this.itemForm = this.fb.group({
      name: ['', []],
      code_number: ['', []],
      expiration_date: ['', []],
      notes: ['', []],
      veterinarian: ['', []]
    });
  }

  ngOnChanges() {
    if (this.mode === 'edit' && this.item) {
      console.log(this.item);
      this.itemForm.patchValue({
        name: this.item.name,
        code_number: this.item.code_number,
        expiration_date: this.item.expiration_date,
        notes: this.item.notes,
      });
    }
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const formData = new FormData();
      formData.append('name', this.itemForm.get('name')?.value);
      formData.append('code_number', this.itemForm.get('code_number')?.value);
      formData.append('expiration_date', this.itemForm.get('expiration_date')?.value);
      formData.append('notes', this.itemForm.get('notes')?.value);

      if (this.mode === 'create') {
        this.itemRequests.createItem(formData).subscribe({
          next: (response) => {
            this.close.emit();
          },
          error: (err: any) => {
            console.error('Error creating item:', err);
          },
        });
      } else if (this.mode === 'edit') {
        this.itemRequests.updateItem(formData, this.item.iid).subscribe({
          next: (response) => {
            this.close.emit();
          },
          error: (err: any) => {
            console.error('Error updating item:', err);
          }
        });
      }
    }
  }
}
