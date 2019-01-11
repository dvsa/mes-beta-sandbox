import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../common/store.model';
import { getJournalState } from '../journal/journal.reducer';
import { Subscription } from 'rxjs/Subscription';
import { SqlDataStoreProvider } from '../../providers/sql-data-store/sql-data-store';

@IonicPage()
@Component({
  selector: 'page-sql-store-test',
  templateUrl: 'sql-store-test.html'
})
export class SqlStoreTestPage extends BasePageComponent implements OnInit, OnDestroy {

  currentContents: any;

  currentKeys: any;

  journalStateFromStore: any;
  journalKey: string = 'JOURNAL';
  journalStateFromSecureStorage: any;

  testResultKey: string = 'TEST_RESULT';
  testResultStateFromSecureStorage: any;

  subscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private store$: Store<StoreModel>,
    private sqlData: SqlDataStoreProvider
  ) {
    super(platform, navCtrl, authenticationProvider)
  }

  ngOnInit(): void {

    this.subscription = this.store$.select(getJournalState).subscribe((newState) => {
      console.log('New journal State', newState)
      this.journalStateFromStore = newState;
    })

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initialiseDB() {
    this.sqlData.getKeys();

  }

  updateSecureObject() {

  }

  getKeysInStore() {

  }

  getJournalState() {

  }

  setJournalState() {

  }

  clearJournalState() {

  }

  getTestResultState() {

  }

  setTestResultState() {

  }

  clearTestResultState() {

  }
}
