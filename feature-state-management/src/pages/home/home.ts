import { RootState } from './../../app/app.state.reducer';
import { AppStateSelector } from './../../app/app.state.selector';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

interface HomePageState {
  loggedIn$: Observable<string>;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  homePageState: HomePageState;

  constructor(store: Store<{ rootState: RootState }>, appStateSelector: AppStateSelector) {
    this.homePageState = {
      loggedIn$: store.select(appStateSelector.getLoggedInState())
    }
  }

}
