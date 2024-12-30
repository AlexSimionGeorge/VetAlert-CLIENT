import { Component } from '@angular/core';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseApp, initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebaseApp";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { Router } from '@angular/router';
import { AuthService } from "../services/AuthService";
import {HttpClient} from "@angular/common/http";
import {backendApiUrl} from "../pages/ requests/config";

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string | null = null;

  provider = new GoogleAuthProvider();

  constructor(private router: Router, private authService: AuthService, private http: HttpClient) {}

  onGoogleLogin(): void {
    signInWithPopup(auth, this.provider)
      .then(async (result) => {
        const user = result.user;

        const idToken = await user.getIdToken();

        this.authService.setToken(idToken);
        this.errorMessage = null;

        this.updateUserData();

        await this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error('Error during Google Sign-In:', error);
        this.errorMessage = error.message;
      });
  }

  updateUserData(): void {
    this.http.post(backendApiUrl + '/api/veterinarian/', {})
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          console.error('Error fetching data:', err);
        }
      });
  }
}
