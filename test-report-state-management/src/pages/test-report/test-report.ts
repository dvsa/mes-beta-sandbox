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

import * as candidateInfoActions from '../../store/candidate-info.actions';

@Component({
  selector: 'page-test-report',
  templateUrl: 'test-report.html'
})
export class TestReport {

  testReport: any

  constructor(private store: Store<any>) {
    store.select(state => state.testReport).subscribe(data => this.testReport = data);
    store.dispatch(new candidateInfoActions.LoadCandidateInfo());
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
    
    if (this.testReport.pickedFaultType === FaultType.driving) {
      this.store.dispatch(new AddDrivingFault(payload));
      return;
    }

    if (this.testReport.pickedFaultType === FaultType.serious) {
      this.store.dispatch(new AddSeriousFault(payload));
      return;
    }

    if (this.testReport.pickedFaultType === FaultType.dangerous) {
      this.store.dispatch(new AddDangerousFault(payload));
      return;
    }
  }
}
