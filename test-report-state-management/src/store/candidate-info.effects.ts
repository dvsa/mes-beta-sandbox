import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import * as candidateInfoActions from './candidate-info.actions';
import { CandidateInfoService } from '../services/candidate-info.service';
import { of } from 'rxjs/observable/of';
 
@Injectable()
export class CandidateInfoEffects {
  constructor(
    private candidateInfoService: CandidateInfoService,
    private actions$: Actions) {}
  
  @Effect()
  getCandidateInfo$ = this.actions$.ofType(candidateInfoActions.LOAD_CANDIDATE_INFO).pipe(
    switchMap(() => {
      console.log(candidateInfoActions.LOAD_CANDIDATE_INFO, "as an effect");
      return this.candidateInfoService
        .getCandidateInfo()
        .pipe(
          map(candidateInfo => new candidateInfoActions.LoadCandidateInfoSuccess(candidateInfo)),
          catchError(error => of(new candidateInfoActions.LoadCandidateInfoFailure(error)))
        );
      }
    )
  );
 
}