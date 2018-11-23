
import { Action } from '@ngrx/store';
import { FaultType } from '../data-models/fault-type';

export enum ActionTypes {
  PickFaultType = 'PickFaultType',
  AddDrivingFault = 'AddFault',
  AddSeriousFault = 'AddSeriousFault',
  AddDangerousFault = 'AddDangerousFault'
}

export class PickFaultType implements Action {
  readonly type: string = ActionTypes.PickFaultType;
  constructor(public faultType: FaultType) {}
}

export class AddDrivingFault implements Action {
  readonly type: string = ActionTypes.AddDrivingFault;
  constructor(public testActivityCategory: string, public testActivity: string) {}
}

export class AddSeriousFault implements Action {
  readonly type: string = ActionTypes.AddSeriousFault;
  constructor(public testActivityCategory: string, public testActivity: string) {}
}

export class AddDangerousFault implements Action {
  readonly type: string = ActionTypes.AddDangerousFault;
  constructor(public testActivityCategory: string, public testActivity: string) {}
}