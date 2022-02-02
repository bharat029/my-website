import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetResumeUrl } from './cv.actions';
import { CVStateModel } from './cv.model';

@State<CVStateModel>({
  name: 'cv',
})
@Injectable()
export class CvState {
  @Selector()
  static getResumeUrl(state: CVStateModel) {
    return state.resumeUrl;
  }

  @Action(SetResumeUrl)
  setResumeUrl(
    { getState, patchState }: StateContext<CVStateModel>,
    { payload }: SetResumeUrl
  ) {
    patchState({ resumeUrl: payload });
  }
}
