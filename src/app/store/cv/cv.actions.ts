import { CVStateModel } from './cv.model';

export class SetEducations {
  static readonly type = '[Educations Admin] Set Educations';
  constructor(public payload: CVStateModel['educations']) {}
}

export class SetHackathons {
  static readonly type = '[Hackathons Admin] Set Hackathons';
  constructor(public payload: CVStateModel['hackathons']) {}
}

export class SetPORs {
  static readonly type = '[PORs Admin] Set PORs';
  constructor(public payload: CVStateModel['pors']) {}
}

export class SetResumeUrl {
  static readonly type = '[General Admin] Set ResumeUrl';
  constructor(public payload: string) {}
}

export class SetTechSkills {
  static readonly type = '[TechSkills Admin] Set TechSkills';
  constructor(public payload: CVStateModel['techSkills']) {}
}

export class SetVolunteerExps {
  static readonly type = '[VolunteerExps Admin] Set VolunteerExps';
  constructor(public payload: CVStateModel['volunteerExps']) {}
}

export class SetWorkExps {
  static readonly type = '[WorkExps Admin] Set WorkExps';
  constructor(public payload: CVStateModel['workExps']) {}
}
