import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {AuthenticationProvider} from '../providers/authentication/authentication';
import {AppConfigProvider} from '../providers/app-config/app-config';
import {SecureStorage, SecureStorageObject} from "@ionic-native/secure-storage";
import {DataStoreProvider} from "../providers/data-store/data-store";

@Component({
  templateUrl: 'app.html'
})
export class App {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    appConfig: AppConfigProvider,
    private splashScreen: SplashScreen,
    private authenticationProvider: AuthenticationProvider,
    private secureStorage: SecureStorage,
    private dataStore: DataStoreProvider
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      appConfig.refreshConfigSettings();

      this.secureStorage.create('MES').then((storage: SecureStorageObject) => {
        console.log('secure storage initialised', storage)
        this.dataStore.setSecureContainer(storage);
      });

      // Attempt to login if on an ios device
      if (platform.is('ios')) {
        this.login();
      } else {
        this.rootPage = 'JournalPage';
      }
      ;
    });
  }

  login = (): Promise<any> => this.authenticationProvider.login()
    .then(() => {
      this.splashScreen.hide();
      this.rootPage = 'JournalPage';
    })
    .catch(() => {
      this.splashScreen.hide();
      this.rootPage = 'LoginPage';
    })

}
