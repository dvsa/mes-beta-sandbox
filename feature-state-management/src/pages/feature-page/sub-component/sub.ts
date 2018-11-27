import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sub',
  templateUrl: 'sub.html'
})
export class SubComponent {
  
  // Dispatch using inputs
  @Input() count$: Observable<number>;
  @Input() increment;
  @Input() decrement;
  @Input() logIn;
  @Input() logOut;

  text: string = 'SubComponent';

}
