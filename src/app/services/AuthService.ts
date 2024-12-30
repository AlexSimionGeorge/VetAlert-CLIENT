import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);

  token$ = this.tokenSubject.asObservable();

  setToken(token: string): void {
    this.tokenSubject.next(token);
    sessionStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return this.tokenSubject.value || sessionStorage.getItem('authToken');
  }

  clearToken(): void {
    this.tokenSubject.next(null);
    sessionStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
