import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {PagesComponent} from "./pages/pages.component";
import {AuthGuard} from "./guards/AuthGuard";


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: PagesComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
