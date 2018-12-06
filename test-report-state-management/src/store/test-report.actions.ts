import { Action } from '@ngrx/store';
import { FaultType } from '../models/fault-type';
import { TestActivityReference } from '../models/test-activity-reference';

export const PICK_FAULT_TYPE = '[Test Report] Pick Fault Type';
export const ADD_DRIVING_FAULT = '[Test Report] Add Driving Fault';
export const ADD_SERIOUS_FAULT = '[Test Report] Add Serious Fault';
export const ADD_DANGEROUS_FAULT = '[Test Report] Add Dangerous Fault';

export class PickFaultType implements Action {
  readonly type = PICK_FAULT_TYPE;
  constructor(public payload: FaultType) {}
}

export class AddDrivingFault implements Action {
  readonly type = ADD_DRIVING_FAULT;
  constructor(public payload: TestActivityReference) {}
}

export class AddSeriousFault implements Action {
  readonly type = ADD_SERIOUS_FAULT;
  constructor(public payload: TestActivityReference) {}
}

export class AddDangerousFault implements Action {
  readonly type = ADD_DANGEROUS_FAULT;
  constructor(public payload: TestActivityReference) {}
}

export type FaultActions = 
  | PickFaultType
  | AddDrivingFault
  | AddSeriousFault
  | AddDangerousFault;