import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CvState } from '../cv/cv.state';
import { Init } from './root.actions';
import { RootStateModel } from './root.model';

@State<RootStateModel>({
  name: 'root',
  defaults: {
    isReady: false,
  },
  children: [CvState],
})
@Injectable()
export class RootState {
  @Action(Init)
  init({ getState, patchState }: StateContext<RootStateModel>) {
    patchState({ isReady: !getState().isReady })
  }

  @Selector()
  static getIsReady(state: RootStateModel) {
    return state.isReady;
  }
}
