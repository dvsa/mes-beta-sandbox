import { ActionTypes, ActionsUnion } from './app.state.actions';

export interface RootState {
  loggedIn: string;
}

export const initialAppState: RootState = {
  loggedIn: 'false'
};

export function rootStateReducer(state = initialAppState, action: ActionsUnion) : RootState {
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
