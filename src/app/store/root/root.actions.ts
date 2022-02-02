export class Init {
  static readonly type = '[App Component] Init';
}

export namespace About {
  export class Add {
    static readonly type = '[Admin] Add About';
    constructor(public payload: string) {}
  }
}

export namespace LandingSubtitle {
  export class Update {
    static readonly type = '[General Admin] Update LandingSubtitle';
    constructor(public payload: string) {}
  }
}

export namespace ProfileImage {
  export class Update {
    static readonly type = '[General Admin] Update ProfileImageUrl';
    constructor(public payload: string) {}
  }
}