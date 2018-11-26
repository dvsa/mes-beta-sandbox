import { ActionTypes, ActionsUnion } from './app.state.actions';

export interface RootState {
  loggedIn: string;
}

export const initialState: RootState = {
  loggedIn: 'false'
};

export function rootStateReducer(state = initialState, action: ActionsUnion) : RootState {
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

export const getLoggedIn = (state: RootState) => state.loggedIn;
