import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OwnerRequests} from "../../ requests/Owner.requests";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-form-pop-up-owners',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './pop-up-form.component.html',
  styleUrl: './pop-up-form.component.css'
})
export class PopUpFormComponent {
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() owner: any = null;
  @Output() close = new EventEmitter<void>();

  ownerForm: FormGroup;
  constructor(private fb: FormBuilder, private ownerRequests: OwnerRequests) {
    this.ownerForm = this.fb.group({
      name: ['', []],
      email: ['', []],
    });
  }

  ngOnChanges() {
    if (this.mode === 'edit' && this.owner) {
      this.ownerForm.patchValue({
        name: this.owner.name,
        email: this.owner.email,
      });
    }
  }

  onSubmit(): void {
    if (this.ownerForm.valid) {
      const formData = new FormData();
      formData.append('name', this.ownerForm.get('name')?.value);
      formData.append('email', this.ownerForm.get('email')?.value);

      if (this.mode === 'create') {
        this.ownerRequests.createOwner(formData).subscribe({
          next: (response) => {
            this.close.emit();
          },
          error: (err: any) => {
            console.error('Error creating animal:', err);
          },
        });
      } else if (this.mode === 'edit') {
        this.ownerRequests.updateOwner(formData, this.owner.oid).subscribe({
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

}
