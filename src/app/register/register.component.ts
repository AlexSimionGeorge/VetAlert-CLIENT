import { Component } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseApp, initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebaseApp";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  onButtonPressed(): void {
    console.log('Button was pressed!');
    if (this.email === '' || this.password === '') {
      this.errorMessage = 'Email and password cannot be empty.';
      return;
    }

    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        // Signed up
        console.log('User registered:', userCredential.user);
        this.errorMessage = null;
      })
      .catch((error) => {
        console.error('Error during sign-up:', error);
        this.errorMessage = error.message;
      });
  }
}
