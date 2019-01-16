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

  currentStates: any;

  journalStateFromStore: any;
  journalKey: string = 'JOURNAL';
  journalStateDB: any;

  testResultKey: string = 'TEST_RESULT';
  testResultStateDB: any;

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

  getStates() {
    this.sqlData.getKeys().then((response) => {
        console.log('get keys sql resolved in page', response);
        this.currentStates = response;
      },
      error => {
        console.log('get keys sql resolved in page error', error);
        this.currentStates = 'No states found';
      }
    )
  }

  getJournalState() {
    this.sqlData.getItem(this.journalKey).then((response) => {
        console.log('get journal state', response);
        this.journalStateDB = response;
      },
      error => {
        console.log('get journal state error', error);
      })
  }

  setJournalState() {
    this.sqlData.setItem(this.journalKey, JSON.stringify(this.journalStateFromStore)).then((response) => {
        console.log('set journal state', response);
      },
      error => {
        console.log('set journal state error', error);
      })
  }

  clearJournalState() {
    this.sqlData.removeItem(this.journalKey).then((response) => {
        console.log('delete journal state', response);
      },
      error => {
        console.log('delete journal state error', error);
      })
  }

  getTestResultState() {
    this.sqlData.getItem(this.testResultKey).then((response) => {
        console.log('get test result state', response);
        this.testResultStateDB = response;
      },
      error => {
        console.log('get journal state error', error);
      })
  }

  setTestResultState() {
    this.sqlData.setItem(this.testResultKey, JSON.stringify({
      name: 'Mike Twong',
      result: 'pass',
      date: Date.now()
    })).then((response) => {
        console.log('set test result state', response);
      },
      error => {
        console.log('set test result state error', error);
      })
  }

  clearTestResultState() {
    this.sqlData.removeItem(this.testResultKey).then((response) => {
        console.log('delete test result state', response);
      },
      error => {
        console.log('delete test result state error', error);
      })
  }

  dropDB() {
    this.sqlData.dropDB();
  }

  initDB() {
    this.sqlData.init();
  }

}
