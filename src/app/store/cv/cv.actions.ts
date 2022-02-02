export namespace Resume {
  export class Update {
    static readonly type = '[General Admin] Update ResumeUrl';
    constructor(public payload: string) {}
  }
}
