import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { InitializerService } from '../../shared/initializer.service';
import { AuthState } from '../auth/auth.state';
import { CvState } from '../cv/cv.state';
import {
  Init,
  LandingSubtitle,
  ProfileImage
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

  @Selector()
  static getIsReady(state: RootStateModel) {
    return state.isReady;
  }

  @Selector()
  static getLandingSubtitle(state: RootStateModel) {
    return state.landingSubtitle;
  }

  @Action(LandingSubtitle.Update)
  updateLandingSubtitle(
    { getState, patchState }: StateContext<RootStateModel>,
    { payload }: LandingSubtitle.Update
  ) {
    patchState({
      landingSubtitle: payload,
    });
  }

  @Selector()
  static getProfileImageUrl(state: RootStateModel) {
    return state.profileImageUrl;
  }

  @Action(ProfileImage.Update)
  updateProfileImage(
    { getState, patchState }: StateContext<RootStateModel>,
    { payload }: ProfileImage.Update
  ) {
    patchState({
      profileImageUrl: payload,
    });
  }

  @Action(Init)
  init({ getState, patchState }: StateContext<RootStateModel>) {
    // const data = JSON.parse(localStorage.getItem('data')!);

    // if (data) {
    //   console.log('local');
    //   patchState({ ...data, isReady: true });
    // } else {
    //   console.log('firestore');
    //   this.initializerService
    //     .initialize()
    //     .pipe(tap((data) => localStorage.setItem('data', JSON.stringify(data))))
    //     .subscribe((data) => patchState({ ...data, isReady: true }));
    // }
    this.initializerService
      .initialize()
      .subscribe((data) => patchState({ ...data, isReady: true }));
  }

  @Selector()
  static getAbouts(state: RootStateModel) {
    return state.abouts;
  }

  @Selector()
  static getCurrentProjects(state: RootStateModel) {
    return state.projects?.filter((project) => project.current);
  }
}
