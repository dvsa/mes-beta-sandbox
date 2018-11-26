import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-component',
  templateUrl: 'shared-component.html'
})
export class SharedComponent {

  // Dispatch using inputs
  @Input() increment;
  @Input() decrement;
  @Input() logIn;
  @Input() logOut;

  text: string;

  constructor() {
    this.text = 'SharedComponent';
  }

}
