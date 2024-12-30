import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { AuthService } from '../services/AuthService';
import { getAuth, signOut } from 'firebase/auth';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {
  constructor(private router: Router, private authService: AuthService) {}

  onLogout(): void {
    const auth = getAuth();
    signOut(auth)
      .then(async () => {
        this.authService.clearToken();
        await this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  }
}
