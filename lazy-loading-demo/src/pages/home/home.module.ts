import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ComponentsModule } from '../../components/components.module';
import { NavigationButton } from './navigation-button/navigation-button';


@NgModule({
  declarations: [
    HomePage,
    NavigationButton
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    ComponentsModule
  ],
})
export class HomePageModule {}
