import { LogIn, LogOut } from './../../app/app.state.actions';
import { Increment, Decrement } from './feature-state.actions';
import { AppStateSelector } from './../../app/app.state.selector';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-feature-state',
  templateUrl: 'feature-state.html',
})
export class FeatureStatePage {

  loggedIn$: Observable<string>;
  count$: Observable<number>;

  constructor(appStateSelector: AppStateSelector, private store: Store<{ rootState: any, count: number }>) {
    this.loggedIn$ = store.select(appStateSelector.getLoggedInState());
    this.count$ = store.select(appState => appState.count);
  }

  incrementDispatcher = () => {
    this.store.dispatch(new Increment());
  }

  decrementDispatcher = () => {
    this.store.dispatch(new Decrement());
  }

  logInDispatcher = () => {
    this.store.dispatch(new LogIn());
  }

  logOutDispatcher = () => {
    this.store.dispatch(new LogOut());
  }

}
