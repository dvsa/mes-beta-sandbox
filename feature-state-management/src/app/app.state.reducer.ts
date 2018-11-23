import { ActionTypes } from './app.state.actions';
import { Action } from '@ngrx/store';

export const initialState = {
  loggedIn: 'false'
};

export function appStateReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.LogIn:
      return {
        ...state,
        loggedIn: 'true'
      };

    case ActionTypes.LogOut:
    return {
      ...state,
      loggedIn: 'false'
    };

    default:
      return state;
  }
}