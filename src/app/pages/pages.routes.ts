import { Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AnimalsComponent } from './animals/animals.component';

export const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'animals', component: AnimalsComponent },
    ],
  },
];
