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

  constructor(public navCtrl: NavController, public navParams: NavParams, private store: Store<{ appState: any }>) {
    this.loggedIn$ = store.select(state => state.appState.loggedIn);
    this.count$ = store.select(state => state.count); // tslint:disable-line
  }

}
