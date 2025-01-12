import {OwnerModel} from "./Owner.model";

export interface AnimalModel {
  aid: string;
  name: string;
  species: string;
  picture: string;
  owner: OwnerModel;
  veterinarian: string;
}
