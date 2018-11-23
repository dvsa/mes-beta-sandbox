
import { Action } from '@ngrx/store';
import { FaultType } from '../data-models/fault-type';

export enum ActionTypes {
  PickFaultType = 'PickFaultType',
  AddFault = 'AddFault',
}

export class PickFaultType implements Action {
  readonly type: string = ActionTypes.PickFaultType;
  constructor(public faultType: FaultType) {}
}

export class AddFault implements Action {
  readonly type: string = ActionTypes.AddFault;
  constructor(public testActivityCategory: string, public testActivity: string, public faultType: FaultType) {}
}
