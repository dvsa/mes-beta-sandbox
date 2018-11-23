
import { Action } from '@ngrx/store';

import set from 'lodash.set';
import get from 'lodash.get';

import { ActionTypes } from './actions';

import { FaultType } from '../data-models/fault-type';

export const initialState = {
  pickedFaultType: FaultType.driving,
  judgement: {
    overtaking: {
      driving: 0,
      serious: 0,
      dangerous: 0,
    },
  },
};

export function reducer(state = initialState, action: Action) {
  let testActivityCategory = '';
  let testActivity = '';
  let faults = {
    driving: 0,
    serious: 0,
    dangerous: 0,
  };

  switch (action.type) {
    case ActionTypes.PickFaultType:
      return {
        ...state,

        // Weird that the action needs to be converted
        pickedFaultType: (action as any).faultType,
      };

    case ActionTypes.AddDrivingFault:
      testActivityCategory = (action as any).testActivityCategory;
      testActivity = (action as any).testActivity;

      faults = get(state, `${testActivityCategory}.${testActivity}`);

      return set(state, `${testActivityCategory}.${testActivity}`, { ...faults, driving: faults.driving + 1 });
    
    case ActionTypes.AddSeriousFault:
      testActivityCategory = (action as any).testActivityCategory;
      testActivity = (action as any).testActivity;

      faults = get(state, `${testActivityCategory}.${testActivity}`);

      return set(state, `${testActivityCategory}.${testActivity}`, { ...faults, serious: faults.serious + 1 });

    case ActionTypes.AddDangerousFault:
      testActivityCategory = (action as any).testActivityCategory;
      testActivity = (action as any).testActivity;

      faults = get(state, `${testActivityCategory}.${testActivity}`);

      return set(state, `${testActivityCategory}.${testActivity}`, { ...faults, dangerous: faults.dangerous + 1 });

    default:
      return state;
  }
}