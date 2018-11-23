import { Component } from '@angular/core';

/**
 * Generated class for the FeatureStateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'feature-state',
  templateUrl: 'feature-state.html'
})
export class FeatureStateComponent {

  text: string;

  constructor() {
    console.log('Hello FeatureStateComponent Component');
    this.text = 'FeatureStateComponent';
  }

}
