# mobile-examiner

DVSA Mobile Examiner Services (GDS Beta phase)

## Mobile Client

### Pre-requisites

- Node (v 10.13.0)
- npm (v 6.4.1)
- Ionic CLI + Cordova: `npm install -g cordova ionic`
- Security
  - [Git secrets](https://github.com/awslabs/git-secrets)
  - [ScanRepo](https://github.com/UKHomeOffice/repo-security-scanner)

### Get started

- `npm install`
- `npm run config:dev` (if using the dev config)
- `ionic serve`

#### Serve with local data
- `npm run serve:local` (This will take the files in `/mock/` and serve them. You can edit them in `src/assets/mock` after running the command, this will live reload the UI with the new updated mock data. To point the app to different mock data, edit the `environment/environment.local.ts` file)

### Mac users

To run the app in the simulator with live code reload, run the following:
`ionic cordova emulate ios -lc --address=localhost`

### Manual Deployments

- `npm run ionic:deploy`

### Security Tools

**NOTE: There is currently an issue using bash v4 with git secrets, in that it will only allow single file commits. This has been reported numerous times but support for this tool seems to be limited and where an earlier fix should have resolved this problem, it is still an issue.**
[git secrets issues](https://github.com/awslabs/git-secrets/issues)

After installing git secrets as part of the pre-requisites, run a one-time set up (in each repo) with

```bash
  cd /path/to/my/repo
  git secrets --install
  git secrets --register-aws
```

Run with `git secrets --scan`.

After installing scanRepo as part of the pre-requisites, run with `git log -p | scanrepo`.

### Cordova plugins in browser

Some Cordova plugins have special code that should handle the `browser` platform. Unfortunately `ionic serve` does not use them. To use them, run `ionic cordova run browser`

### Running the Appium/Selenium testsuite

You can run the Appium testsuite either against a web based version of the application or against a simulator version.

Pre-requisites

- Appium (`npm install -g appium` - https://www.npmjs.com/package/appium)
- WebDriver-Manager (`npm install -g webdriver-manager` - https://www.npmjs.com/package/webdriver-manager)
- Carthage (`brew install carthage` - https://github.com/appium/appium/blob/HEAD/docs/en/drivers/ios-xcuitest.md - dependancy of XCUITest driver)

To run against the simulator

- Build the application `ionic cordova build ios -- --buildFlag="-UseModernBuildSystem=0"`
- Run Appium `appium`
- In another tab execute the simulator based testsuite `npm run test:e2e-simulator-bdd`
- Once complete generate the report `npm run test:generate-report`

You can run individual features e.g. `npm run test:e2e-simulator-bdd -- --specs='test/e2e/features/01-login.feature'`

### Building & signing the app using Fastlane
N.B. this assumes you have Fastlane installed along with the required DVSA distribution certificate & provisioning profile. This is done via the Mac OS Jenkins slave so these steps are only for information only. 

#### Unlock Keychain
The login keychain needs to be unlocked if this is running as part of a CI build:

```
security unlock-keychain -p "$PASSWORD" /Users/$USERNAME/Library/Keychains/$KEYCHAIN_NAME
security set-keychain-settings -t 1900 -l /Users/$USERNAME/Library/Keychains/$KEYCHAIN_NAME
```

#### Build

 Run `fastlane ios build` 
 
 The output of this will be a signed .IPA package stored in the `build` directory.
