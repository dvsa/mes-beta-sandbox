
import { Action } from "@ngrx/store";
import { Message } from './message';

export const ADD_MESSAGE = 'Add Message';

export class AddMessage implements Action {
  readonly type = ADD_MESSAGE
  constructor(public payload: Message) {}
}

export type Types =
  | AddMessage;