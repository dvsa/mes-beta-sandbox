import { ActionTypes, ActionsUnion } from './feature-page.actions';

export const initialFeatureState: number = 0;

export function featureReducer(state = initialFeatureState, action: ActionsUnion) : number {
  switch (action.type) {
    case ActionTypes.Increment:
      return state + 1;

    case ActionTypes.Decrement:
      return state - 1;

    default:
      return state;
  }
}