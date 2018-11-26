import { ActionTypes, ActionsUnion } from './feature-state.actions';

export const initialState: number = 0;

export function featureReducer(state = initialState, action: ActionsUnion) : number {
  switch (action.type) {
    case ActionTypes.Increment:
      return state + 1;

    case ActionTypes.Decrement:
      return state - 1;

    default:
      return state;
  }
}