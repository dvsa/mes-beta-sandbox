import { Component, Input } from '@angular/core';

@Component({
  selector: 'sub',
  templateUrl: 'sub.html'
})
export class SubComponent {
  
  // Dispatch using inputs
  @Input() increment;
  @Input() decrement;
  @Input() logIn;
  @Input() logOut;

  text: string;

  constructor() {
    this.text = 'SubComponent';
  }

}
