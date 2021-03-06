import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../components/components.module';
import { JournalPage } from './journal';
import { journalReducer } from './journal.reducer';
import { JournalEffects } from './journal.effects';
import { SlotSelectorProvider } from '../../providers/slot-selector/slot-selector';
import { TestDetailsComponent } from './components/test-details/test-details';
import { TimeComponent } from './components/time/time';
import { CandidateComponent } from './components/candidate/candidate';
import { TestOutcomeComponent } from './components/test-outcome/test-outcome';
import { TestSlotComponent } from './components/test-slot/test-slot';
import { IndicatorsComponent } from './components/indicators/indicators';
import { JournalProvider } from '../../providers/journal/journal';

@NgModule({
  declarations: [
    JournalPage,
    TestDetailsComponent,
    IndicatorsComponent,
    TimeComponent,
    CandidateComponent,
    TestOutcomeComponent,
    TestSlotComponent
  ],
  imports: [
    IonicPageModule.forChild(JournalPage),
    StoreModule.forFeature('journal', journalReducer),
    EffectsModule.forFeature([JournalEffects]),
    ComponentsModule,
  ],
  entryComponents: [
    TestSlotComponent
  ],
  providers: [
    JournalProvider,
    SlotSelectorProvider
  ]
})
export class JournalPageModule {}
