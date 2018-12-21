import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform, AlertController } from 'ionic-angular';
import { MSAdal, AuthenticationContext, AuthenticationResult } from '@ionic-native/ms-adal';
import { HttpClient } from '@angular/common/http'
import AWS from 'aws-sdk';
import { Adal5Service } from 'adal-angular5';
import aws4 from 'aws4';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  accessToken: any;
  idToken: any;
  output: string = '';
  logs: string[] = [];
  showLogin: boolean = true;
  userInfoKeys: string[] = [];
  awsOutput: string[] = [];
  cognitoPoolId: string = 'eu-west-1:f5a0346e-9bbb-4153-affd-bbe59cd5b7a3';
  signature: any;
  authToken: any;

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    private msAdal: MSAdal,
    private alertCtrl: AlertController,
    private http: HttpClient,
    private adal5Service: Adal5Service
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.logs.push(`platform is ios: ${this.platform.is('ios')}`);
  }

  getNativeAuthConfig() {
    return {
      context: 'https://login.windows.net/common',
      resourceUrl: '5cc3585a-bddc-45db-a58d-ada2ea6c4875',
      clientId: '5cc3585a-bddc-45db-a58d-ada2ea6c4875',
      redirectUrl: 'x-msauth-uk-gov-dvsa-mobile-examiner-services://uk.gov.dvsa.mobile-examiner-services'
    }
  }

  getWebAuthConfig() {
    return {
      clientId: '5cc3585a-bddc-45db-a58d-ada2ea6c4875',
      tenant: '6c448d90-4ca1-4caf-ab59-0a2aa67d7801'
    }
  }

  webLogin() {

    this.adal5Service.init(this.getWebAuthConfig()); // Configure the ADAL Service
    this.adal5Service.handleWindowCallback(); // Handle callback if this is a redirect from Azure

    // Check if the user is authenticated. If not, call the login() method
    if (!this.adal5Service.userInfo.authenticated) {
      this.adal5Service.login();
    }
    console.log(`userInfo from web login: ${JSON.stringify(this.adal5Service.userInfo)}`);
    this.authToken = this.adal5Service.userInfo.token;
    this.testAWS();
  }

  login() {
    this.platform.is('ios') ? this.nativeLogin() : this.webLogin(); 
  }

  nativeLogin = () => {
    this.logs.push(`logging in..`);
    const { context, resourceUrl, clientId, redirectUrl } = this.getNativeAuthConfig();
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
    this.platform.is('ios') ? this.nativeLogout() : this.webLogout(); 
  }

  webLogout = () => {
    this.adal5Service.logOut();
  }

  nativeLogout = () => {
    const { context } = this.getNativeAuthConfig();
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
    this.output = `Successful Azure AD auth token: ${authResponse.accessToken}`;
    this.accessToken = authResponse.accessToken;
    const splitAccessToken = this.accessToken.split('.')[1];
    console.log(`accessToken: ${this.accessToken}`);
    this.logs.push(`decoded accessToken: ${atob(splitAccessToken)}`);
    this.idToken = authResponse.idToken;
    this.authToken = this.accessToken;
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
    console.log('this.signature');
    console.log(this.signature);
    this.http.get('https://jmje3h78ng.execute-api.eu-west-1.amazonaws.com/seb-poc/journal', this.signature)
      .subscribe(
        res => this.awsOutput.push(`http response: ${JSON.stringify(res)}`),
        err => this.awsOutput.push(`http error: ${JSON.stringify(err)}`)
      );
  }

  getSigs(accessKeyId, secretAccessKey, sessionToken) {
    const CREDS = { accessKeyId, secretAccessKey, sessionToken };

    const options = {
      // service: 'execute-api',
      host: 'jmje3h78ng.execute-api.eu-west-1.amazonaws.com',
      path: '/seb-poc/journal',
      region: 'eu-west-1'
    }

    const signer = aws4.sign(options, CREDS);
    console.log('signer');
    console.log(JSON.stringify(signer));
    this.signature = options;
  }

  testAWS = () => {
    console.log(`idToken: ${this.idToken}`);
    AWS.config.region = 'eu-west-1';
    this.awsOutput.push(`cognito pool id: ${this.cognitoPoolId}`);
    const credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: this.cognitoPoolId,
      Logins: {
        'sts.windows.net/6c448d90-4ca1-4caf-ab59-0a2aa67d7801': this.authToken
      }
    });

    AWS.config.credentials = credentials;

    credentials.getPromise()
      .then(() => {
        const { accessKeyId, secretAccessKey, sessionToken } = AWS.config.credentials;
        console.log('get credentials success');
        console.log(AWS.config.credentials);
        this.awsOutput.push(`access_key: ${accessKeyId}`);
        this.awsOutput.push(`secret: ${secretAccessKey}`);
        this.getSigs(accessKeyId, secretAccessKey, sessionToken);
        this.testTokenVerification();
      })
      .catch(err => this.awsOutput.push(`Creds error: ${err}`));

  }

}
