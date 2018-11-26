import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { FaultType } from '../../models/fault-type';
import { TestActivityReference } from '../../models/test-activity-reference';
import { 
  PickFaultType,
  AddDrivingFault,
  AddSeriousFault,
  AddDangerousFault,
} from '../../store/test-report.actions';

interface Fault {
  driving: number
  serious: number
  dangerous: number
}

interface Faults {
  pickedFaultType: FaultType
  judgement: {
    overtaking: Fault
  }
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  faults: Faults

  constructor(private store: Store<any>) {
    store.select(state => state.faults).subscribe(data => this.faults = data);
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
    const payload: TestActivityReference = {
      category: testActivityCategory,
      activity: testActivity
    }
    if (this.faults.pickedFaultType === FaultType.driving) {
      this.store.dispatch(new AddDrivingFault(payload));
      return;
    }

    if (this.faults.pickedFaultType === FaultType.serious) {
      this.store.dispatch(new AddSeriousFault(payload));
      return;
    }

    if (this.faults.pickedFaultType === FaultType.dangerous) {
      this.store.dispatch(new AddDangerousFault(payload));
      return;
    }
  }
}
