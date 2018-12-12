import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform, AlertController } from 'ionic-angular';
import { MSAdal, AuthenticationContext, AuthenticationResult } from '@ionic-native/ms-adal';
import AWS from 'aws-sdk';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  authToken: any;
  idToken: any;
  output: string = '';
  logs: string[] = [];
  showLogin: boolean = false;
  userInfoKeys: string[] = [];
  awsOutput: string[] = [];
  cognitoPoolId: string = 'eu-west-1:e799f41a-4756-4bc9-a2b4-3628ddf33a88';

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
    const { context, resourceUrl, clientId, redirectUrl } = this.getAuthConfig();
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
      subTitle: authResponse.accessToken,
      buttons: ['Dismiss']
    }).present();
    this.output = `Successful Azure AD auth: ${authResponse.accessToken}`;
    this.authToken = authResponse.accessToken;
    this.idToken = authResponse.idToken;
    this.logs.push(`idToken: ${this.idToken}`);
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

  testAWS = () => {
    AWS.config.region = 'eu-west-1';
    this.awsOutput.push(`cognito pool id: ${this.cognitoPoolId}`);
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: this.cognitoPoolId
    });
    AWS.config.getCredentials((err) => {
      if (err) {
        this.awsOutput.push(`Creds error: ${err}`);
      } else {
        const ec2 = new AWS.EC2();
        const params = {}; // all the things
        ec2.describeSecurityGroups(params, (_err, data) => {
          if (_err) this.awsOutput.push(`EC2 error: ${_err}`);
          else     this.awsOutput.push(`AWS response: ${data}`)
                   this.awsOutput.push(JSON.stringify(data, null, 2));
        });
      }
    });
  }

}
