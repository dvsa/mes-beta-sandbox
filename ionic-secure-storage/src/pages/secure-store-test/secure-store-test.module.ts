import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import {SecureStoreTestPage} from "./secure-store-test";

@NgModule({
  declarations: [
    SecureStoreTestPage
  ],
  imports: [
    IonicPageModule.forChild(SecureStoreTestPage),
    ComponentsModule,
  ],
})
export class SecureStoreTestPageModule {}
