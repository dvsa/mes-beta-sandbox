import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TerminateTestPage } from './terminate-test';
import { EffectsModule } from '@ngrx/effects';
import { TerminateTestAnalyticsEffects } from './terminate-test.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@NgModule({
  declarations: [
    TerminateTestPage,
  ],
  imports: [
    IonicPageModule.forChild(TerminateTestPage),
    EffectsModule.forFeature([TerminateTestAnalyticsEffects]),
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class TerminateTestPageModule {}
