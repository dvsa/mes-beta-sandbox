
import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as journalActions from '../store/journal.actions';
import * as messagesActions from '../store/messages.actions';
import { JournalProvider } from '../providers/journal/journal';

@Injectable()
export class JournalEffects {

  constructor(
    private actions$: Actions,
    private journalProvider: JournalProvider) {}

  @Effect()
  journal$ = this.actions$.pipe(
    ofType(journalActions.LOAD_JOURNAL),
    switchMap(() => {
      return this.journalProvider
        .getJournal()
        .pipe(
          switchMap(data => {
            return [
              new messagesActions.AddMessage({ text: 'Journal loaded successfully' }),
              new journalActions.LoadJournalSuccess(data)
            ]
          }),
          catchError(err => of(new journalActions.LoadJournalFailure(err)))
        )
    })
  );

}