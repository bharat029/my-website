import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { InitializerService } from '../../shared/initializer.service';
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
  constructor(private initializerService: InitializerService) {}

  @Selector()
  static getIsReady(state: RootStateModel) {
    return state.isReady;
  }

  @Action(Init)
  init({ getState, patchState }: StateContext<RootStateModel>) {
    // this.initializerService.initialize();
    const data = JSON.parse(localStorage.getItem('data')!);
    patchState({ ...data, isReady: true });
  }
}
