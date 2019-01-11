import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { SqlStoreTestPage } from './sql-store-test';

@NgModule({
  declarations: [
    SqlStoreTestPage
  ],
  imports: [
    IonicPageModule.forChild(SqlStoreTestPage),
    ComponentsModule,
  ],
})
export class SqlStoreTestPageModule {}
