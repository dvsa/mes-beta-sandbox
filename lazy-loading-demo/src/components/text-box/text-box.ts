import { Component } from '@angular/core';

/**
 * Generated class for the TextBoxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mes-text-box',
  templateUrl: 'text-box.html'
})
export class TextBoxComponent {

  text: string;

  constructor() {
    console.log('Hello TextBoxComponent Component');
    this.text = 'Hello World';
  }

}
