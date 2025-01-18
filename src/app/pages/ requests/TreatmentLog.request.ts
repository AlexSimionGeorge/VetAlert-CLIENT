import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { backendApiUrl } from './config';
import {ItemModel} from "../models/Item.model";
import {TreatmentLogModel} from "../models/TreatmentLog.model";

@Injectable({
  providedIn: 'root',
})
export class TreatmentLogRequest {
  private treatmentLogEndPoint = backendApiUrl + '/api/treatmentlog/';

  constructor(private http: HttpClient) {}

  getTreatmentLogs(animalID:string): Observable<TreatmentLogModel[]> {
    return this.http.get<TreatmentLogModel[]>(this.treatmentLogEndPoint + animalID + "/");
  }


  deleteTreatmentLog(treatmentLogId: string): Observable<void> {
    const url = `${this.treatmentLogEndPoint}delete/${treatmentLogId}/`;
    return this.http.delete<void>(url);
  }

  createTreatmentLog(treatmentLog: any): Observable<ItemModel> {
    return this.http.post<ItemModel>(this.treatmentLogEndPoint, treatmentLog);
  }

  updateTreatmentLog(treatmentLog: any, id : string): Observable<ItemModel> {
    return this.http.put<ItemModel>(this.treatmentLogEndPoint + id + '/', treatmentLog);
  }

}
