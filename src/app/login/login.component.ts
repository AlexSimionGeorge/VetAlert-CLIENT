import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseApp, initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebaseApp";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";

// Initialize Firebase App and Auth
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
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  // Google Sign-In Provider
  provider = new GoogleAuthProvider();

  ngOnInit(): void {
    // No redirect result checking is needed when using popup
  }

  onEmailLogin(): void {
    if (this.email === '' || this.password === '') {
      this.errorMessage = 'Email and password cannot be empty.';
      return;
    }

    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        // Successfully signed in
        console.log('User signed in:', userCredential.user);
        this.errorMessage = null;
      })
      .catch((error) => {
        console.error('Error during sign-in:', error);
        this.errorMessage = error.message;
      });
  }

  onGoogleLogin(): void {
    signInWithPopup(auth, this.provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log('Google Sign-In successful. User:', user);

        // This gives you a Google Access Token, if needed.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        this.errorMessage = null;
      })
      .catch((error) => {
        console.error('Error during Google Sign-In:', error);
        this.errorMessage = error.message;
      });
  }
}
