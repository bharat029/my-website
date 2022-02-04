import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetEducations, SetHackathons, SetPORs, SetResumeUrl, SetTechSkills, SetVolunteerExps, SetWorkExps } from './cv.actions';
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
  static getEducations(state: CVStateModel) {
    return state.educations;
  }

  @Action(SetEducations)
  setEducations(
    { patchState }: StateContext<CVStateModel>,
    { payload }: SetEducations
  ) {
    patchState({ educations: [...payload] });
  }

  @Selector()
  static getHackathons(state: CVStateModel) {
    return state.hackathons;
  }

  @Action(SetHackathons)
  setHackathons(
    { patchState }: StateContext<CVStateModel>,
    { payload }: SetHackathons
  ) {
    patchState({ hackathons: [...payload] });
  }

  @Selector()
  static getPORs(state: CVStateModel) {
    return state.pors;
  }

  @Action(SetPORs)
  setPORs(
    { patchState }: StateContext<CVStateModel>,
    { payload }: SetPORs
  ) {
    patchState({ pors: [...payload] });
  }

  @Selector()
  static getResumeUrl(state: CVStateModel) {
    return state.resumeUrl;
  }

  @Action(SetResumeUrl)
  setResumeUrl(
    { patchState }: StateContext<CVStateModel>,
    { payload }: SetResumeUrl
  ) {
    patchState({ resumeUrl: payload });
  }

  @Selector()
  static getTechSkills(state: CVStateModel) {
    return state.techSkills;
  }

  @Action(SetTechSkills)
  setTechSkills(
    { patchState }: StateContext<CVStateModel>,
    { payload }: SetTechSkills
  ) {
    patchState({ techSkills: [...payload] });
  }

  @Selector()
  static getVolunteerExps(state: CVStateModel) {
    return state.volunteerExps;
  }

  @Action(SetVolunteerExps)
  setVolunteerExps(
    { patchState }: StateContext<CVStateModel>,
    { payload }: SetVolunteerExps
  ) {
    patchState({ volunteerExps: [...payload] });
  }

  @Selector()
  static getWorkExps(state: CVStateModel) {
    return state.workExps;
  }

  @Action(SetWorkExps)
  setWorkExps(
    { patchState }: StateContext<CVStateModel>,
    { payload }: SetWorkExps
  ) {
    patchState({ workExps: [...payload] });
  }
}
