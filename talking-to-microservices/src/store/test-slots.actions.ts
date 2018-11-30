import { Action } from '@ngrx/store';

export const CLEAR_TEST_SLOTS = '[Test Slots] Clear test slots';

export class ClearTestSlots implements Action {
  readonly type = CLEAR_TEST_SLOTS
}

export type Types = 
  | ClearTestSlots;
