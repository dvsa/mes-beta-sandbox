import { Component } from '@angular/core';

@Component({
  selector: 'messages',
  templateUrl: 'messages.html'
})
export class MessagesComponent {

  text: string;

  constructor() {
    console.log('Hello MessagesComponent Component');
    this.text = 'Hello World';
  }

}
