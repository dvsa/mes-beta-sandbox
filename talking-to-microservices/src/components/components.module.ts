import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MessagesComponent } from './messages/messages';

@NgModule({
	declarations: [ MessagesComponent ],
	imports: [ BrowserModule ],
	exports: [ MessagesComponent ]
})
export class ComponentsModule {}
