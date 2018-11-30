import { Component, Input } from '@angular/core';

/**
 * Generated class for the TestSlotsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'test-slots',
  templateUrl: 'test-slots.html'
})
export class TestSlotsComponent {

  @Input()
  slots

  constructor() {
    console.log(this.slots);
  }

}
