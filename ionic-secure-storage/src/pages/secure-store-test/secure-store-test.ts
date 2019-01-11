import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { DataStoreProvider } from '../../providers/data-store/data-store';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../common/store.model';
import { getJournalState } from '../journal/journal.reducer';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-secure-store-test',
  templateUrl: 'secure-store-test.html'
})
export class SecureStoreTestPage extends BasePageComponent implements OnInit, OnDestroy {

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
    public dataStore: DataStoreProvider,
    private store$: Store<StoreModel>,
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

  updateSecureObject() {
    this.currentContents = this.dataStore.getSecureContainer();
  }

  getKeysInStore() {
    return this.dataStore.getKeys().then(
      (response) => {
        if (response.length > 0) {
          this.currentKeys = response;
        } else {
          this.currentKeys = 'No keys found'
        }
      },
      (error) => {
        console.log('error getKeysInStore', error);
        this.currentKeys = 'No keys found'
      })
  }

  getJournalState() {
    this.dataStore.getItem(this.journalKey).then((response) => {
        console.log('response from getJournalState', response)
        this.journalStateFromSecureStorage = JSON.parse(response);
      },
      (error) => {
        console.log('error getJournalState', error);
        this.journalStateFromSecureStorage = 'Journal state is empty'
      })
  }

  setJournalState() {
    this.dataStore.setItem(this.journalKey, JSON.stringify(this.journalStateFromStore)).then((response) => {
        console.log('response from setJournalState', response)
      },
      (error) => {
        console.log('error setJournalState', error);
      })
  }

  clearJournalState() {
    this.dataStore.removeItem(this.journalKey).then((response) => {
        console.log('response from clearJournalState', response)
      },
      (error) => {
        console.log('error clearJournalState', error);
      })
  }

  getTestResultState() {
    this.dataStore.getItem(this.testResultKey).then((response) => {
        this.testResultStateFromSecureStorage = JSON.parse(response);
      },
      (error) => {
        this.testResultStateFromSecureStorage = 'Test Result state is empty'
      })
  }

  setTestResultState() {
    this.dataStore.setItem(this.testResultKey, JSON.stringify({
      name: 'Mike Twong',
      result: 'pass',
      date: Date.now()
    })).then((response) => {
        console.log('response from setTestResultState', response)
      },
      (error) => {
        console.log('error setTestResultState', error);
      })
  }

  clearTestResultState() {
    this.dataStore.removeItem(this.testResultKey).then((response) => {
      },
      (error) => {
        console.log('error clearTestResultState', error);
      })
  }
}
