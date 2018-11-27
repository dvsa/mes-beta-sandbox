import { Action } from '@ngrx/store';
import { CandidateInfo } from '../models/candidate-info';

export const LOAD_CANDIDATE_INFO = '[Test Report] Load Candidate Info';
export const LOAD_CANDIDATE_INFO_FAILURE = '[Test Report] Load Candidate Info Failure';
export const LOAD_CANDIDATE_INFO_SUCCESS = '[Test Report] Load Candidate Info Success';

export class LoadCandidateInfo implements Action {
  readonly type = LOAD_CANDIDATE_INFO;
}

export class LoadCandidateInfoFailure implements Action {
  readonly type = LOAD_CANDIDATE_INFO_FAILURE;
  constructor(public payload: CandidateInfo) {}
}

export class LoadCandidateInfoSuccess implements Action {
  readonly type = LOAD_CANDIDATE_INFO_SUCCESS;
  constructor(public payload: CandidateInfo) {}
}

export type CandidateInfoActions = 
  | LoadCandidateInfo
  | LoadCandidateInfoFailure
  | LoadCandidateInfoSuccess;
  