import { Component, Input } from '@angular/core';

@Component({
  selector: 'mes-button',
  templateUrl: 'mes-button.html'
})
export class MesButtonComponent {

  @Input()
  label: string;
  @Input()
  isDisabled: boolean = false;

  constructor() {
  }

}
