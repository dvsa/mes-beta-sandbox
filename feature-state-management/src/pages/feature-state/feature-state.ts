import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private store: Store<{ rootState: any, count: number }>) {
    this.loggedIn$ = store.select(appState => appState.rootState.loggedIn);
    this.count$ = store.select(appState => appState.count);
  }

}
