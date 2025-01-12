import {Owner} from "./Owner.model";

export interface Animal {
  aid: string;
  name: string;
  species: string;
  picture: string;
  owner: Owner;
  veterinarian: string;
}
