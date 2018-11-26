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

  constructor(appStateSelector: AppStateSelector, store: Store<{ rootState: any, count: number }>) {
    this.loggedIn$ = store.select(appStateSelector.getLoggedInState());
    this.count$ = store.select(appState => appState.count);
  }

}
