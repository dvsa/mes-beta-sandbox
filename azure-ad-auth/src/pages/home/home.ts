import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform, AlertController } from 'ionic-angular';
import { MSAdal, AuthenticationContext, AuthenticationResult } from '@ionic-native/ms-adal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  authToken: any;
  output: string = '';
  logs: string[] = [];

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    private msAdal: MSAdal,
    private alertCtrl: AlertController
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.logs.push(`platform is ios: ${this.platform.is('ios')}`);
    if (this.platform.is('ios')) this.login();
  }

  getAuthConfig() {
    return {
      context: 'https://login.windows.net/common',
      resourceUrl: 'https://graph.windows.net',
      clientId: '09fdd68c-4f2f-45c2-be55-dd98104d4f74',
      redirectUrl: 'x-msauth-io-ionic-starter-ammar://io.ionic.starter.ammar'
    }
  }

  login = () => {
    this.logs.push(`logging in..`);
    const { context, resourceUrl, clientId, redirectUrl } = this.getAuthConfig();
    this.logs.push(`context: ${context}, resourceUrl: ${resourceUrl}, clientId: ${clientId}, redirectUrl: ${redirectUrl}`);
    const authContext: AuthenticationContext = this.msAdal.createAuthenticationContext(context);
    this.logs.push('authContext created');
    // Attempt to authorize the user silently
    authContext.acquireTokenSilentAsync(resourceUrl, clientId)
      .then(this.successfulAuthentication)
      .catch((e: any) => {
        this.logs.push('acquireTokenSilentAsync didn\'t work');
        // Silent login failed
        // We require user credentials, so this triggers the authentication dialog box
        // this login will prompt the user using the UI
        this.logs.push('running acquireTokenAsync');
        authContext.acquireTokenAsync(resourceUrl, clientId, redirectUrl)
          .then(this.successfulAuthentication)
          .catch(this.failedAuthentication);
      });
  }

  successfulAuthentication = (authResponse: AuthenticationResult) => {
    this.logs.push('successfulAuthentication');
    this.alertCtrl.create({
      title: 'Successful Azure AD auth',
      subTitle: authResponse.accessToken,
      buttons: ['Dismiss']
    }).present();
    this.output = `Successful Azure AD auth: ${authResponse.accessToken}`;
    this.authToken = authResponse.accessToken;
  }

  failedAuthentication = (err) => {
    this.logs.push('failedAuthentication');
    this.alertCtrl.create({
      title: 'Failed Azure AD auth',
      subTitle: `Error: ${err}`,
      buttons: ['Dismiss']
    }).present();
    this.output = `Failed Azure AD auth: ${err}`;
  }

}
