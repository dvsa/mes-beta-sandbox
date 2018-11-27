import set from 'lodash.set';
import get from 'lodash.get';

import * as fromTestReport from './test-report.actions';
import * as fromCandidateInfo from './candidate-info.actions';

import { FaultType } from '../models/fault-type';
import { ActivityFaults } from '../models/activity-faults';

export interface TestReportState {
  pickedFaultType: FaultType,
  judgement: {
    overtaking: ActivityFaults,
  }
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

export function reducer(state = initialState, action: fromTestReport.FaultActions | fromCandidateInfo.CandidateInfoActions): TestReportState {
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

    case fromCandidateInfo.LOAD_CANDIDATE_INFO:
      console.log(fromCandidateInfo.LOAD_CANDIDATE_INFO);
      return {
        ...state,
      }

    case fromCandidateInfo.LOAD_CANDIDATE_INFO_FAILURE:
      console.log(fromCandidateInfo.LOAD_CANDIDATE_INFO_FAILURE);
      return {
        ...state,
      }

    case fromCandidateInfo.LOAD_CANDIDATE_INFO_SUCCESS:
      console.log(fromCandidateInfo.LOAD_CANDIDATE_INFO_SUCCESS);
      return {
        ...state,
      }

    default:
      return state;
  }
}