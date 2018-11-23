
import { Action } from '@ngrx/store';

import { ActionTypes } from './actions';

export const initialState = {};

export function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.PickFaultType:
      return {
        ...state,

        // Weird that the action needs to be converted
        pickedFaultType: (action as any).faultType,
      };

    case ActionTypes.AddFault:
      return {
        ...state,
        
      }
    
    default:
      return state;
  }
}