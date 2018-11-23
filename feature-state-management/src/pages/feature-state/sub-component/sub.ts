import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Increment, Decrement } from '../feature-state.actions';
import { LogIn, LogOut } from '../../../app/app.state.actions';

@Component({
  selector: 'sub',
  templateUrl: 'sub.html'
})
export class SubComponent {

  text: string;

  constructor(private store: Store<{ count: number }>) {
    console.log('Hello SubComponent Component');
    this.text = 'SubComponent';
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
