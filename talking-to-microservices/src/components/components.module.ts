import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { MessagesComponent } from './messages/messages';
import { TestSlotsComponent } from './test-slots/test-slots';

@NgModule({
	declarations: [ MessagesComponent,
    TestSlotsComponent ],
	imports: [
		BrowserModule,
		IonicModule
	],
	exports: [ MessagesComponent,
    TestSlotsComponent ]
})
export class ComponentsModule {}
