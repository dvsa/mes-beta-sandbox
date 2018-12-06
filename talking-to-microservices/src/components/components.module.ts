import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { MessagesComponent } from './messages/messages';
import { TestSlotsComponent } from './test-slots/test-slots';
import { ErrorMessageComponent } from './error-message/error-message';

@NgModule({
	declarations: [ MessagesComponent,
    TestSlotsComponent,
    ErrorMessageComponent ],
	imports: [
		BrowserModule,
		IonicModule
	],
	exports: [ MessagesComponent,
    TestSlotsComponent,
    ErrorMessageComponent ]
})
export class ComponentsModule {}
