import { State, Selector, Action, StateContext } from '@ngxs/store';
import { AuthStateModel } from './auth.model';
import { Injectable } from '@angular/core';
import { AdminAuth } from './auth.actions';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    isReady: false,
    isAdmin: false,
  }
})
@Injectable()
export class AuthState {
  @Selector()
  static getAuth(state: AuthStateModel) {
    return state;
  }

  @Action(AdminAuth.SignIn)
  signIn({ getState, patchState }: StateContext<AuthStateModel>) {
    patchState({ isReady: true, isAdmin: true });
  }

  @Action(AdminAuth.SignOut)
  signOut({ getState, patchState }: StateContext<AuthStateModel>) {
    patchState({ isReady: true, isAdmin: false });
  }
}