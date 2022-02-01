import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  async signIn(email: string, password: string) {
    const { user } = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    return user;
  }

  isSignedIn() {
    return this.auth.currentUser !== null;
  }

  signOut() {
    return this.auth.signOut();
  }
}
