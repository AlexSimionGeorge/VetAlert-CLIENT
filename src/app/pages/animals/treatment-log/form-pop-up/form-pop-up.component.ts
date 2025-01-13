import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Observable} from "rxjs";
import {ItemModel} from "../../../models/Item.model";
import {ItemRequests} from "../../../ requests/Item.requests";
import {TreatmentLogRequest} from "../../../ requests/TreatmentLog.request";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatInput, MatInputModule} from "@angular/material/input";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule, MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-form-pop-up-treatment-log',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatError,
    MatDatepickerInput,
    MatFormField,
    MatDatepickerToggle,
    MatDatepicker,
    MatInput,
    NgIf,
    MatButton,
    AsyncPipe,
    MatOption,
    MatSelect,
    NgForOf,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatHint,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  templateUrl: './form-pop-up.component.html',
  styleUrl: './form-pop-up.component.css'
})
export class FormPopUpComponent implements OnInit {
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() treatmentLog: any = null;
  @Input() animalID: string= '';
  @Output() close = new EventEmitter<void>();


  treatmentLogForm: FormGroup;
  items!:Observable<ItemModel[]>;
  constructor(private fb: FormBuilder, private itemsRequests:ItemRequests, private treatmentLogRequest:TreatmentLogRequest) {
    this.treatmentLogForm = this.fb.group({
      item: [null, []],
      quantity: ['', []],
      date: [null, []],
    });
  }

  ngOnInit(): void {
    this.items = this.itemsRequests.getItems();

    if (this.mode === 'edit' && this.treatmentLog) {
      this.treatmentLogForm.patchValue({
        species: this.treatmentLog.item,
        quantity:  this.treatmentLog.quantity,
        date: this.treatmentLog.date,
      });
    }
  }

  onSubmit(): void {

    if (this.treatmentLogForm.valid) {
      const formData = new FormData();
      formData.append('animal', this.animalID);
      formData.append('item', this.treatmentLogForm.get('item')?.value);
      formData.append('quantity', this.treatmentLogForm.get('quantity')?.value);

      const unixTimestamp = new Date(this.treatmentLogForm.get('date')?.value).getTime() / 1000;
      formData.append('date', unixTimestamp.toString());


      if (this.mode === 'create') {
        this.treatmentLogRequest.createTreatmentLog(formData).subscribe({
          next: (response) => {
            this.close.emit();
          },
          error: (err: any) => {
            console.error('Error creating TL:', err);
          },
        });
      } else if (this.mode === 'edit') {
        this.treatmentLogRequest.updateTreatmentLog(formData, this.treatmentLog.tlid).subscribe({
          next: (response) => {
            this.close.emit();
          },
          error: (err: any) => {
            console.error('Error updating TL:', err);
          }
        });
      }
    }
  }

}
