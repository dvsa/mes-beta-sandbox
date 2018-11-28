import { RootState } from './../../app/app.state.reducer';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { getLoggedInState } from '../../app/app.state.selector';

interface HomePageState {
  loggedIn$: Observable<string>;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  homePageState: HomePageState;

  constructor(store: Store<{ rootState: RootState }>) {
    this.homePageState = {
      loggedIn$: store.select(getLoggedInState)
    }
  }

}
