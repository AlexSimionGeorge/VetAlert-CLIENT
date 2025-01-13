import {ItemModel} from "./Item.model";

export interface TreatmentLogModel{
  tlid: string;
  animal: string;
  item: ItemModel;
  date: Date;
  quantity: string;
}
