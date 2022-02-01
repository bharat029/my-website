import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Store } from '@ngxs/store';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AdminAuth } from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private store: Store) {
    this.auth.onAuthStateChanged(user => {
      if (user !== null) {
        this.store.dispatch(new AdminAuth.SignIn());
      } else {
        this.store.dispatch(new AdminAuth.SignOut());
      }
    })
  }

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
