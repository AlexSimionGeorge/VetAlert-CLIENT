import { Component } from '@angular/core';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseApp, initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebaseApp";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";

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
export class LoginComponent{
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  provider = new GoogleAuthProvider();

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
