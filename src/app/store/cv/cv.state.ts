import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Resume } from './cv.actions';
import { CVStateModel } from './cv.model';

@State<CVStateModel>({
  name: 'cv',
})
@Injectable()
export class CvState {
  @Selector()
  static getCV(state: CVStateModel) {
    return state;
  }

  @Selector()
  static getResumeUrl(state: CVStateModel) {
    return state.resumeUrl;
  }

  @Action(Resume.Update)
  updateResumeUrl(
    { getState, patchState }: StateContext<CVStateModel>,
    { payload }: Resume.Update
  ) {
    patchState({ resumeUrl: payload });
  }
}
