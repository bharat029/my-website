import { State, Selector, Action, StateContext } from '@ngxs/store';
import { CVStateModel } from './cv.model';
import { Injectable } from '@angular/core';
import { CV } from './cv.actions';

@State<CVStateModel>({
  name: 'cv',
})
@Injectable()
export class CvState {
  @Action(CV.Init)
  init(
    { getState, patchState }: StateContext<CVStateModel>,
    { payload }: CV.Init
  ) {
    patchState(payload);
  }
}
