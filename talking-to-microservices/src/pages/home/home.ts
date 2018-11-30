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
  testSlots = {}

  constructor(private store: Store<{ journal: { isLoading: boolean, testSlots } }>) {
    store.select(state => state.journal).subscribe(journal => this.isJournalLoading = journal.isLoading);
    store.select(state => state.journal.testSlots).subscribe(testSlots => this.testSlots = testSlots);
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