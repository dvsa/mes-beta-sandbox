import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentLibraryPage } from './component-library';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ComponentLibraryPage,
  ],
  imports: [
    IonicPageModule.forChild(ComponentLibraryPage),
    ComponentsModule
  ],
})
export class ComponentLibraryPageModule {}
