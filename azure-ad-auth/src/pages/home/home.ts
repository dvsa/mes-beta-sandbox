import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform, AlertController } from 'ionic-angular';
import { MSAdal, AuthenticationContext, AuthenticationResult } from '@ionic-native/ms-adal';
import { HttpClient } from '@angular/common/http'
import AWS from 'aws-sdk';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  accessToken: any;
  idToken: any;
  output: string = '';
  logs: string[] = [];
  showLogin: boolean = false;
  userInfoKeys: string[] = [];
  awsOutput: string[] = [];
  cognitoPoolId: string = 'eu-west-1:f5a0346e-9bbb-4153-affd-bbe59cd5b7a3';

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    private msAdal: MSAdal,
    private alertCtrl: AlertController,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.logs.push(`platform is ios: ${this.platform.is('ios')}`);
    if (this.platform.is('ios')) this.showLogin = true;
  }

  getAuthConfig() {
    return {
      context: 'https://login.windows.net/common',
      resourceUrl: 'https://graph.windows.net',
      clientId: '09fdd68c-4f2f-45c2-be55-dd98104d4f74',
      redirectUrl: 'x-msauth-uk-gov-dvsa-mobile-examiner-services://uk.gov.dvsa.mobile-examiner-services'
    }
  }

  login = () => {
    this.logs.push(`logging in..`);
    const { context, resourceUrl, clientId, redirectUrl } = this.getAuthConfig();
    this.logs.push(`context: ${context}, resourceUrl: ${resourceUrl}, clientId: ${clientId}, redirectUrl: ${redirectUrl}`);
    const authContext: AuthenticationContext = this.msAdal.createAuthenticationContext(context);
    this.logs.push('authContext created');
    this.logs.push(typeof authContext.acquireTokenAsync);
    // Attempt to authorize the user silently
    authContext.acquireTokenSilentAsync(resourceUrl, clientId, '')
      .then(this.successfulAuthentication)
      .catch((e: any) => {
        this.logs.push(`acquireTokenSilentAsync didn\'t work: ${e}`);
        // Silent login failed
        // We require user credentials, so this triggers the authentication dialog box
        // this login will prompt the user using the UI
        this.logs.push('running acquireTokenAsync');
        authContext.acquireTokenAsync(resourceUrl, clientId, redirectUrl, '', '')
          .then(this.successfulAuthentication)
          .catch(this.failedAuthentication);
      });
  }

  logout = () => {
    const { context } = this.getAuthConfig();
    const authContext: AuthenticationContext = this.msAdal.createAuthenticationContext(context);
    this.logs.push('Logging out, clearing tokenCache');
    authContext.tokenCache.clear();
  }

  successfulAuthentication = (authResponse: AuthenticationResult) => {
    const { userInfo } = authResponse;
    this.logs.push('successfulAuthentication');
    for (let key in userInfo) {
      if (userInfo.hasOwnProperty(key)) {
        this.userInfoKeys.push(userInfo[key]);
      }
    }
    this.alertCtrl.create({
      title: 'Successful Azure AD auth',
      buttons: ['Dismiss']
    }).present();
    this.output = `Successful Azure AD auth: ${authResponse.accessToken}`;
    this.accessToken = authResponse.accessToken;
    const splitAccessToken = this.accessToken.split('.')[1];
    this.logs.push(`decoded accessToken: ${atob(splitAccessToken)}`);
    this.idToken = authResponse.idToken;
    this.logs.push(`idToken: ${this.idToken}`);
    const splitIdToken = this.idToken.split('.')[1];
    this.logs.push(`decoded idToken: ${atob(splitIdToken)}`);
    this.testAWS();
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

  testTokenVerification = () => {

    this.awsOutput.push('starting http get');

    this.http.get('https://jmje3h78ng.execute-api.eu-west-1.amazonaws.com/seb-poc/journal')
      .subscribe(
        res => this.awsOutput.push(`http response: ${JSON.stringify(res)}`),
        err => this.awsOutput.push(`http error: ${JSON.stringify(err)}`)
      );
  }

  testAWS = () => {
    AWS.config.region = 'eu-west-1';
    this.awsOutput.push(`cognito pool id: ${this.cognitoPoolId}`);
    const credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: this.cognitoPoolId,
      Logins: {
        'sts.windows.net/6c448d90-4ca1-4caf-ab59-0a2aa67d7801': this.idToken
      }
    });

    AWS.config.credentials = credentials;
    
    credentials.getPromise()
      .then(data => this.awsOutput.push(JSON.stringify(data)))
      .catch(err => this.awsOutput.push(`Creds error: ${err}`));

    this.testTokenVerification();
  }

}
