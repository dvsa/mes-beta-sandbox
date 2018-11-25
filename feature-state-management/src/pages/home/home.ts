import { RootState } from './../../app/app.state.reducer';
import { AppStateSelector } from './../../app/app.state.selector';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loggedIn$: Observable<string>;

  constructor(private store: Store<{ rootState: RootState }>, private appStateSelector: AppStateSelector) {
    this.loggedIn$ = store.select(appStateSelector.getLoggedInState);
  }

}
