import { Content } from './root.model';

export class Init {
  static readonly type = '[App Component] Init';
}

export class SetAbouts {
  static readonly type = '[Update Admin] Update Abouts';
  constructor(public payload: Content[]) {}
}
export class SetLandingSubtitle {
  static readonly type = '[General Admin] Update LandingSubtitle';
  constructor(public payload: string) {}
}

export class SetProfileImage {
  static readonly type = '[General Admin] Update ProfileImageUrl';
  constructor(public payload: string) {}
}
