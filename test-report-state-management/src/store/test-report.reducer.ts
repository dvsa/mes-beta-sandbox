import set from 'lodash.set';
import get from 'lodash.get';

import * as fromTestReport from './test-report.actions';

import { FaultType } from '../models/fault-type';
import { Action } from 'rxjs/scheduler/Action';

export interface TestReportState {
  pickedFaultType: FaultType,
  judgement: {}
}

export const initialState: TestReportState = {
  pickedFaultType: FaultType.driving,
  judgement: {
    overtaking: {
      driving: 0,
      serious: 0,
      dangerous: 0,
    },
  },
};

export function reducer(state = initialState, action: fromTestReport.FaultActions): TestReportState {
  let testActivityCategory = '';
  let testActivity = '';
  let faults = {
    driving: 0,
    serious: 0,
    dangerous: 0,
  };

  switch (action.type) {
    case fromTestReport.PICK_FAULT_TYPE:
      return {
        ...state,
        pickedFaultType: action.payload,
      };

    case fromTestReport.ADD_DRIVING_FAULT:
      testActivityCategory = action.payload.category;
      testActivity = action.payload.activity;

      faults = get(state, `${testActivityCategory}.${testActivity}`);

      return set(state, `${testActivityCategory}.${testActivity}`, { ...faults, driving: faults.driving + 1 });
    
    case fromTestReport.ADD_SERIOUS_FAULT:
      testActivityCategory = action.payload.category;
      testActivity = action.payload.activity;

      faults = get(state, `${testActivityCategory}.${testActivity}`);

      return set(state, `${testActivityCategory}.${testActivity}`, { ...faults, serious: faults.serious + 1 });

    case fromTestReport.ADD_DANGEROUS_FAULT:
      testActivityCategory = action.payload.category;
      testActivity = action.payload.activity;

      faults = get(state, `${testActivityCategory}.${testActivity}`);

      return set(state, `${testActivityCategory}.${testActivity}`, { ...faults, dangerous: faults.dangerous + 1 });

    default:
      return state;
  }
}