import { LogIn, LogOut } from './../../app/app.state.actions';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Increment, Decrement } from '../../pages/feature-state/feature-state.actions';

@Component({
  selector: 'feature-state',
  templateUrl: 'feature-state.html'
})
export class FeatureStateComponent {

  text: string;

  constructor(private store: Store<{ count: number }>) {
    console.log('Hello FeatureStateComponent Component');
    this.text = 'FeatureStateComponent';
  }

  increment() {
    this.store.dispatch(new Increment());
  }
 
  decrement() {
    this.store.dispatch(new Decrement());
  }

  logIn() {
    this.store.dispatch(new LogIn())
  }

  logOut() {
    this.store.dispatch(new LogOut())
  }

}
