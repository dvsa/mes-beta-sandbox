import { Action } from '@ngrx/store';
import { ActionTypes } from './feature-state.actions';

export const initialState = 0;

export function featureReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.Increment:
      return state + 1;

    case ActionTypes.Decrement:
      return state - 1;

    default:
      return state;
  }
}