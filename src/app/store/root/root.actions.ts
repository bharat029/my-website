import { UserData } from './root.model';

export class Init {
  static readonly type = '[App Component] Init';
}

export class SetAbouts {
  static readonly type = '[Update Admin] Update Abouts';
  constructor(public payload: UserData['abouts']) {}
}

export class SetCourses {
  static readonly type = '[Courses Admin] Set courses';
  constructor(public payload: UserData['courses']) {}
}

export class SetLandingSubtitle {
  static readonly type = '[General Admin] Update LandingSubtitle';
  constructor(public payload: UserData['landingSubtitle']) {}
}

export class SetProfileImage {
  static readonly type = '[General Admin] Update ProfileImageUrl';
  constructor(public payload: UserData['profileImageUrl']) {}
}

export class SetProjects {
  static readonly type = '[Projects Admin] Set Projects';
  constructor(public payload: UserData['projects']) {}
}

export class SetSpecializations {
  static readonly type = '[Specializations Admin] Set Specializations';
  constructor(public payload: UserData['specializations']) {}
}
