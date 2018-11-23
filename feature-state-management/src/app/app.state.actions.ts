import { Action } from '@ngrx/store';

export enum ActionTypes {
  LogIn = 'LOG_IN',
  LogOut = 'LOG_OUT'
}

export class LogIn implements Action {
  readonly type = ActionTypes.LogIn;
}

export class LogOut implements Action {
  readonly type = ActionTypes.LogOut;
}
