import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StoreModule } from '@ngrx/store';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

//import { EffectsModule } from '@ngrx/effects';

import { MyApp } from './app.component';
import { TestReport } from '../pages/test-report/test-report';
import { reducer } from '../store/test-report.reducer';
//import { CandidateInfoEffects } from '../store/candidate-info.effects';

@NgModule({
  declarations: [
    MyApp,
    TestReport
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ testReport: reducer }),
    //EffectsModule.forRoot([CandidateInfoEffects]),
    IonicModule.forRoot(MyApp),
    StoreDevtoolsModule.instrument() 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TestReport
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
