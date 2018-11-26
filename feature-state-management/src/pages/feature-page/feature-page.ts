import { getCountState } from './feature-page.selector';
import { LogIn, LogOut } from './../../app/app.state.actions';
import { Increment, Decrement } from './feature-page.actions';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { getLoggedInState } from '../../app/app.state.selector';

interface FeatureStatePageState {
  loggedIn$: Observable<string>;
  count$: Observable<number>;
}

@IonicPage()
@Component({
  selector: 'page-feature-page',
  templateUrl: 'feature-page.html',
})
export class FeaturePage {

  featurePageState: FeatureStatePageState;

  constructor(private store: Store<{ rootState: any, count: number }>) {
    this.featurePageState = {
      loggedIn$: store.select(getLoggedInState),
      count$: store.select(getCountState)
    }
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
