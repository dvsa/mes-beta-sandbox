import { Component, Input } from '@angular/core';

@Component({
  selector: 'error-message',
  templateUrl: 'error-message.html'
})
export class ErrorMessageComponent {

  @Input()
  text: string;

  @Input()
  clearErrorText: () => void

  constructor() {}

  hasErrorText() {
    return this.text !== undefined && this.text !== '';
  }

}
