import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { WaitingRoomViewDidEnter } from './waiting-room.actions';

declare let cordova: any;

@IonicPage()
@Component({
  selector: 'page-waiting-room',
  templateUrl: 'waiting-room.html',
})
export class WaitingRoomPage extends BasePageComponent {

  constructor(
    private store$: Store<StoreModel>,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
  ) {
    super(platform, navCtrl, authenticationProvider);
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new WaitingRoomViewDidEnter());
  }

  asamOn() {
    if (cordova && cordova.plugins && cordova.plugins.ASAM) {
      cordova.plugins.ASAM.toggle(true, (didSucceed: Boolean) => {
        alert(`cordova.plugins.ASAM ON ${didSucceed}`);
        console.log(`cordova.plugins.ASAM ON ${didSucceed}`);
      });
    }
  }
  asamOff() {
    if (cordova && cordova.plugins && cordova.plugins.ASAM) {
      cordova.plugins.ASAM.toggle(false, (didSucceed: Boolean) => {
        alert(`cordova.plugins.ASAM OFF ${didSucceed}`);
        console.log(`cordova.plugins.ASAM OFF ${didSucceed}`);
      });
    }
  }
}
