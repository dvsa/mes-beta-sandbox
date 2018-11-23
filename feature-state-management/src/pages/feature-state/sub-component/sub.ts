import { Component } from '@angular/core';

/**
 * Generated class for the SubComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sub',
  templateUrl: 'sub.html'
})
export class SubComponent {

  text: string;

  constructor() {
    console.log('Hello SubComponent Component');
    this.text = 'SubComponent';
  }

}
