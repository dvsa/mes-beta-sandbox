import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {BasePageComponent} from '../../classes/base-page';
import {AuthenticationProvider} from '../../providers/authentication/authentication';
import {DataStoreProvider} from "../../providers/data-store/data-store";

@IonicPage()
@Component({
  selector: 'page-secure-store-test',
  templateUrl: 'secure-store-test.html'
})
export class SecureStoreTestPage extends BasePageComponent {

  currentContents: any;

  currentKeys: any;

  journalState: any;
  journalKey: string = 'JOURNAL';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public dataStore: DataStoreProvider
  ) {
    super(platform, navCtrl, authenticationProvider)
  }

  updateSecureObject() {
    this.currentContents = this.dataStore.getSecureContainer();
  }

  getKeysInStore() {
    return this.dataStore.getKeys().then(
      (response) => {
        if (response.length > 0){
          this.currentKeys = response;
        }else {
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
        this.journalState = response;
      },
      (error) => {
        console.log('error getJournalState', error);
        this.journalState = "Journal state is empty"
      })
  }

  setJournalState() {
    this.dataStore.setItem(this.journalKey, '{test: "A test object"}').then((response) => {
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
}
