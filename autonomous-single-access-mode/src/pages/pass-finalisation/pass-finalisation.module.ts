import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassFinalisationPage } from './pass-finalisation';
import { EffectsModule } from '@ngrx/effects';
import { PassFinalisationAnalyticsEffects } from './pass-finalisation.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@NgModule({
  declarations: [
    PassFinalisationPage,
  ],
  imports: [
    IonicPageModule.forChild(PassFinalisationPage),
    EffectsModule.forFeature([PassFinalisationAnalyticsEffects]),
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class PassFinalisationPageModule {}
