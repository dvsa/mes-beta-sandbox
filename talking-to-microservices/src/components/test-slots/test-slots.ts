import { Component, Input } from '@angular/core';

@Component({
  selector: 'test-slots',
  templateUrl: 'test-slots.html'
})
export class TestSlotsComponent {
  @Input()
  slots

  @Input()
  clearSlots: () => void

  constructor() {}

  hasSlots() {
    return this.slots !== undefined && this.slots.length > 0;
  }
}
