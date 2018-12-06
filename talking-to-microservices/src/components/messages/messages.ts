import { Component } from '@angular/core';

import { Store } from '@ngrx/store';

import { Message } from '../../store/message'; 

@Component({
  selector: 'messages',
  templateUrl: 'messages.html'
})
export class MessagesComponent {

  messages: Message[] = [];

  constructor(store: Store<{messages: { msgs: Message[] }}>) {
    store.select(state => state.messages).subscribe(messages => this.messages = messages.msgs);
  }

  hasMessages() {
    return this.messages !== undefined && this.messages.length > 0;
  }

}
