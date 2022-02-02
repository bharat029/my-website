import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { InitializerService } from '../../shared/initializer.service';
import { AuthState } from '../auth/auth.state';
import { CvState } from '../cv/cv.state';
import {
  Init,
  SetAbouts,
  SetLandingSubtitle,
  SetProfileImage
} from './root.actions';
import { RootStateModel } from './root.model';

@State<RootStateModel>({
  name: 'root',
  defaults: {
    isReady: false,
  },
  children: [CvState, AuthState],
})
@Injectable()
export class RootState {
  constructor(private initializerService: InitializerService) {}

  @Action(Init)
  init({ getState, patchState }: StateContext<RootStateModel>) {
    this.initializerService
      .initialize()
      .subscribe((data) => patchState({ ...data, isReady: true }));
  }

  @Selector()
  static getIsReady(state: RootStateModel) {
    return state.isReady;
  }

  @Selector()
  static getLandingSubtitle(state: RootStateModel) {
    return state.landingSubtitle;
  }

  @Action(SetLandingSubtitle)
  setLandingSubtitle(
    { getState, patchState }: StateContext<RootStateModel>,
    { payload }: SetLandingSubtitle
  ) {
    patchState({
      landingSubtitle: payload,
    });
  }

  @Selector()
  static getProfileImageUrl(state: RootStateModel) {
    return state.profileImageUrl;
  }

  @Action(SetProfileImage)
  setProfileImage(
    { getState, patchState }: StateContext<RootStateModel>,
    { payload }: SetProfileImage
  ) {
    patchState({
      profileImageUrl: payload,
    });
  }

  @Selector()
  static getAbouts(state: RootStateModel) {
    return state.abouts;
  }

  @Action(SetAbouts)
  setAbouts(
    { getState, patchState }: StateContext<RootStateModel>,
    { payload }: SetAbouts
  ) {
    patchState({
      abouts: [...payload],
    });
  }

  @Selector()
  static getCurrentProjects(state: RootStateModel) {
    return state.projects?.filter((project) => project.current);
  }

  @Selector()
  static getProjects(state: RootStateModel) {
    return state.projects;
  }
}
