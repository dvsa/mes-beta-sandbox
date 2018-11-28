import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';

import * as mainActions from '../store/actions';
import { mapTo } from 'rxjs/operators';
 
@Injectable()
export class MainEffects {
  constructor(private actions$: Actions) {}
  
  @Effect()
  public firstEffect$: Observable<Action> = this.actions$.pipe(
    ofType( mainActions.FIRST_ACTION ),
    mapTo( new mainActions.FirstAction() )
  );
 
}