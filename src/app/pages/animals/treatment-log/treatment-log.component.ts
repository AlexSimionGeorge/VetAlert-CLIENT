import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {map, Observable} from "rxjs";
import {TreatmentLogModel} from "../../models/TreatmentLog.model";
import {TreatmentLogRequest} from "../../ requests/TreatmentLog.request";
import {MatButton} from "@angular/material/button";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormPopUpComponent} from "./form-pop-up/form-pop-up.component";

@Component({
  selector: 'app-treatment-log',
  standalone: true,
  imports: [
    MatButton,
    AsyncPipe,
    NgForOf,
    DatePipe,
    NgIf,
    FormsModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    FormPopUpComponent
  ],
  templateUrl: './treatment-log.component.html',
  styleUrl: './treatment-log.component.css'
})
export class TreatmentLogComponent implements OnInit {
  @Input() animal: any = null;
  @Output() close = new EventEmitter<void>();

  treatmentLogs!: Observable<TreatmentLogModel[]>;

  isTreatmentLogModalOpen:boolean = false;
  selectedTreatmentLog:any = null
  modalNewUpdateMode: 'create' | 'edit' = 'create';

  constructor( private treatmentLogRequests: TreatmentLogRequest) {

  }

  ngOnInit(): void {
    this.loadTreatmentLogs();
  }

  // loadTreatmentLogs():void{
  //   this.treatmentLogs = this.treatmentLogRequests.getTreatmentLogs(this.animal.aid)
  // }

  loadTreatmentLogs() {
    this.treatmentLogs = this.treatmentLogRequests.getTreatmentLogs(this.animal.aid).pipe(
      map((logs: any[]) =>
        logs.map((log) => ({
          ...log,
          date: new Date(log.date * 1000),
        }))
      )
    );
  }

  deleteTreatmentLog(tlid: string): void {
    this.treatmentLogRequests.deleteTreatmentLog(tlid).subscribe({
      next: (delresp) => {
        this.loadTreatmentLogs();
      },
      error: (error: any) => {
        console.error('Error deleting animal:', error);
      },
    });
  }

  openNewUpdateModal(mode: 'create' | 'edit', treatmentLog: any = null) {
    this.isTreatmentLogModalOpen = true;
    this.modalNewUpdateMode = mode;
    this.selectedTreatmentLog = treatmentLog;
  }

  closeNewUpdateModal(){
    this.isTreatmentLogModalOpen = false;
    this.loadTreatmentLogs();
  }
}
