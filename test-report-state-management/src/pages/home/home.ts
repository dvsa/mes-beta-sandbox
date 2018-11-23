import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { FaultType } from '../../data-models/fault-type';
import { 
  PickFaultType,
  AddDrivingFault,
  AddSeriousFault,
  AddDangerousFault,
} from '../../store/actions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pickedFaultType: FaultType;

  constructor(private store: Store<any>) {
    store.select(state => state.faults).subscribe(data => this.pickedFaultType = data.pickedFaultType);
  }

  pickDrivingFaultType() {
    this.pickFaultType(FaultType.driving);
  }

  pickSeriousFaultType() {
    this.pickFaultType(FaultType.serious);
  }

  pickDangerousFaultType() {
    this.pickFaultType(FaultType.dangerous);
  }

  pickFaultType(faultType: FaultType) {
    this.store.dispatch(new PickFaultType(faultType));
  }

  addFault(testActivityCategory, testActivity) {
    if (this.pickedFaultType === FaultType.driving) {
      this.store.dispatch(new AddDrivingFault(testActivityCategory, testActivity));
      return;
    }

    if (this.pickedFaultType === FaultType.serious) {
      this.store.dispatch(new AddSeriousFault(testActivityCategory, testActivity));
      return;
    }

    if (this.pickedFaultType === FaultType.dangerous) {
      this.store.dispatch(new AddDangerousFault(testActivityCategory, testActivity));
      return;
    }
  }
}
