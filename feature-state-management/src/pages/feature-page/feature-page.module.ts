import { SubComponent } from './sub-component/sub';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeaturePage } from './feature-page';
import { ComponentsModule } from '../../components/components.module';
import { featureReducer } from './feature-page.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    FeaturePage,
    SubComponent
  ],
  imports: [
    IonicPageModule.forChild(FeaturePage),
    StoreModule.forFeature('count', featureReducer),
    ComponentsModule
  ],
})
export class FeatureStatePageModule {}
