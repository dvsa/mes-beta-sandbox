import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LookbackPage } from './lookback';

@NgModule({
  declarations: [
    LookbackPage,
  ],
  imports: [
    IonicPageModule.forChild(LookbackPage),
  ],
})
export class LookbackPageModule {}
