import { Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AnimalsComponent } from './animals/animals.component';
import {OwnersComponent} from "./owners/owners.component";
import {ItemsComponent} from "./items/items.component";

export const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'animals', component: AnimalsComponent },
      { path: 'owners', component: OwnersComponent },
      { path: 'items', component: ItemsComponent },
    ],
  },
];
