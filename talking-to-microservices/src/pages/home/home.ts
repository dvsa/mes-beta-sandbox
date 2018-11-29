import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { LoadJournal } from '../../store/journal.actions';
import { AddMessage } from '../../store/messages.actions'

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  isJournalLoading: boolean = false

  constructor(private store: Store<{ isLoading: boolean}>) {
    store.select(state => state.isLoading).subscribe(isLoading => this.isJournalLoading = isLoading);
  }

  loadJournal() {
    this.store.dispatch(new AddMessage({ text: 'Loading Journal...' }))
    this.store.dispatch(new LoadJournal());
  }

}