import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MessagesComponent } from './messages/messages';
import { TestSlotsComponent } from './test-slots/test-slots';

@NgModule({
	declarations: [ MessagesComponent,
    TestSlotsComponent ],
	imports: [ BrowserModule ],
	exports: [ MessagesComponent,
    TestSlotsComponent ]
})
export class ComponentsModule {}
