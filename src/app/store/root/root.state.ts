import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { InitializerService } from '../../shared/initializer.service';
import { AuthState } from '../auth/auth.state';
import { CvState } from '../cv/cv.state';
import {
  Init,
  SetAbouts,
  SetCourses,
  SetLandingSubtitle,
  SetProfileImage,
  SetProjects,
  SetSpecializations,
} from './root.actions';
import { RootStateModel } from './root.model';

@State<RootStateModel>({
  name: 'root',
  defaults: {
    isReady: false,
    placeholderUrl:
      'https://firebasestorage.googleapis.com/v0/b/bharathanmudaliar.appspot.com/o/images%2Fplaceholder.jpg?alt=media&token=638795a5-e1ce-486f-994f-77e03f112969',
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
  static getPlaceholderUrl(state: RootStateModel) {
    return state.placeholderUrl;
  }

  @Selector()
  static getAbouts(state: RootStateModel) {
    return state.abouts;
  }

  @Action(SetAbouts)
  setAbouts(
    { patchState }: StateContext<RootStateModel>,
    { payload }: SetAbouts
  ) {
    patchState({
      abouts: [...payload],
    });
  }

  @Selector()
  static getCourses(state: RootStateModel) {
    return state.courses;
  }

  @Action(SetCourses)
  setCourses(
    { patchState }: StateContext<RootStateModel>,
    { payload }: SetCourses
  ) {
    patchState({
      courses: [...payload],
    });
  }

  @Selector()
  static getLandingSubtitle(state: RootStateModel) {
    return state.landingSubtitle;
  }

  @Action(SetLandingSubtitle)
  setLandingSubtitle(
    { patchState }: StateContext<RootStateModel>,
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
    { patchState }: StateContext<RootStateModel>,
    { payload }: SetProfileImage
  ) {
    patchState({
      profileImageUrl: payload,
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

  @Action(SetProjects)
  setProjects(
    { patchState }: StateContext<RootStateModel>,
    { payload }: SetProjects
  ) {
    patchState({
      projects: [...payload],
    });
  }

  @Selector()
  static getSpecializations(state: RootStateModel) {
    return state.specializations;
  }

  @Action(SetSpecializations)
  setSpecializations(
    { patchState }: StateContext<RootStateModel>,
    { payload }: SetSpecializations
  ) {
    patchState({
      specializations: [...payload],
    });
  }
}
