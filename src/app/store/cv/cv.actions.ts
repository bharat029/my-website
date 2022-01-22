import { CVStateModel } from './cv.model';

export namespace CV {
  export class Init {
    static readonly type = '[Root State] Init CV';
    constructor(public payload: CVStateModel) {}
  }
}