import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loggedIn$: Observable<string>;

  constructor(public navCtrl: NavController, private store: Store<{ rootState: any }>) {
    this.loggedIn$ = store.select(state => state.rootState.loggedIn);
  }

}
