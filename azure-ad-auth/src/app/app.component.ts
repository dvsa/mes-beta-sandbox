import { SplashScreen } from '@ionic-native/splash-screen';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { MSAdal, AuthenticationContext, AuthenticationResult } from '@ionic-native/ms-adal';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = HomePage;
  authToken: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private msAdal: MSAdal
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.login();
    });
  }

  getAuthConfig() {
    return {
      context: 'https://login.microsoftonline.com/common',
      resourceUrl: 'https://graph.windows.net',
      clientId: '09fdd68c-4f2f-45c2-be55-dd98104d4f74',
      redirectUrl: 'x-ms-auth-uk-gov-dvsa-mobile-examiner://uk.gov.dvsa.mobile-examiner'
    }
  }

  login() {

    const adalConfig = this.getAuthConfig();
    const authContext: AuthenticationContext = this.msAdal.createAuthenticationContext(adalConfig.context);

    // Attempt to authorize the user silently
    authContext.acquireTokenSilentAsync(adalConfig.resourceUrl, adalConfig.clientId, '')
      .then(this.successfulAuthentication, function() {
        // Silent login failed
        // We require user credentials, so this triggers the authentication dialog box
        // this login will prompt the user using the UI
        return authContext.acquireTokenAsync(adalConfig.resourceUrl, adalConfig.clientId,  adalConfig.redirectUrl,'','')
        .then(this.successfulAuthentication, this.failedAuthentication);
      }).catch((e: any) => e);
  }

  successfulAuthentication(authResponse) {
    console.log(`successfulAuthentication: ${authResponse}`);
    this.authToken = authResponse.accessToken;
  }

  failedAuthentication(err) {
    console.log(`failedAuthentication: ${err}`);
  }
}

