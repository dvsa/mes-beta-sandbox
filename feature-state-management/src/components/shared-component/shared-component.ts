import { LogIn, LogOut } from './../../app/app.state.actions';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Increment, Decrement } from '../../pages/feature-state/feature-state.actions';

@Component({
  selector: 'shared-component',
  templateUrl: 'shared-component.html'
})
export class SharedComponent {

  text: string;

  constructor(private store: Store<{ count: number }>) {
    console.log('Hello SharedComponent Component');
    this.text = 'SharedComponent';
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
