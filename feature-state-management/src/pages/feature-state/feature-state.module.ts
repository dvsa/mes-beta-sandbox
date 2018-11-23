import { SubComponent } from './sub-component/sub';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeatureStatePage } from './feature-state';
import { ComponentsModule } from '../../components/components.module';
import { featureReducer } from './feature-state.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    FeatureStatePage,
    SubComponent
  ],
  imports: [
    IonicPageModule.forChild(FeatureStatePage),
    StoreModule.forFeature('count', featureReducer),
    ComponentsModule
  ],
})
export class FeatureStatePageModule {}
