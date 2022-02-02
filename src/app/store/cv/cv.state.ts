import { State, Selector, Action, StateContext } from '@ngxs/store';
import { CVStateModel } from './cv.model';
import { Injectable } from '@angular/core';
import { CV } from './cv.actions';

@State<CVStateModel>({
  name: 'cv',
})
@Injectable()
export class CvState {
  @Selector()
  static getResumeUrl(state: CVStateModel) {
    return state.resumeUrl;
  }
}
