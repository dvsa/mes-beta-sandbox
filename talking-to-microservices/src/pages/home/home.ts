import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';

import * as journalActions from '../../store/journal.actions';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  isJournalLoading: boolean = false

  constructor(private store: Store<{ journal: { isLoading: boolean } }>) {
    store.select(state => state.journal).subscribe(journal => this.isJournalLoading = journal.isLoading);
  }

  loadJournal() {
    this.store.dispatch(new journalActions.LoadJournal());
  }

  loadJournalWithDelay() {
    this.store.dispatch(new journalActions.LoadJournalWithDelay());
  }

  loadJournalWithChanceToFail() {
    this.store.dispatch(new journalActions.LoadJournalWithChanceToFail());
  }

}