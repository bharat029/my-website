export class Init {
  static readonly type = '[App Component] Init';
}

export namespace About {
  export class Add {
    static readonly type = '[Admin] Add About';
    constructor(public payload: string) {}
  }
}
