import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';

import * as journalActions from '../../store/journal.actions';

interface StoreModel {
  journal: {
    isLoading: boolean,
    testSlots: any,
    error: any
  }
}

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  isJournalLoading: boolean = false
  testSlots = {}
  errorText: string = ''

  constructor(private store: Store<StoreModel>) {
    store.select(state => state.journal).subscribe(journal => this.isJournalLoading = journal.isLoading);
    store.select(state => state.journal.testSlots).subscribe(testSlots => this.testSlots = testSlots);
    store.select(state => state.journal.error).subscribe(error => this.errorText = error.message);

    this.clearSlots = this.clearSlots.bind(this);
    this.clearError = this.clearError.bind(this);
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

  clearSlots() {
    this.store.dispatch(new journalActions.ClearTestSlots());
  }

  clearError() {
    this.store.dispatch(new journalActions.ClearError());
  }

}