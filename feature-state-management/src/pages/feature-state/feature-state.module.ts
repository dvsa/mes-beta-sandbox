import { SubComponent } from './sub-component/sub';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeatureStatePage } from './feature-state';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FeatureStatePage,
    SubComponent
  ],
  imports: [
    IonicPageModule.forChild(FeatureStatePage),
    ComponentsModule
  ],
})
export class FeatureStatePageModule {}
