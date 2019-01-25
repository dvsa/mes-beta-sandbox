import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lookback',
  templateUrl: 'lookback.html',
})
export class LookbackPage {

  constructor(public navCtrl: NavController) {
  }

  /*
  apiToken: string = '';

  lookback = (<any>window).Lookback;
  hasStarted: boolean = false;
  isPaused: boolean = false;

  logs: string[] = []


  startSession = () => {
    this.lookback.setupWithAppToken(this.apiToken);
    this.hasStarted = true;
    this.addlog('Started Session');
  }

  pauseSession = () => {
    this.lookback.pause(!this.isPaused)
    this.isPaused = !this.isPaused;
    this.addlog('Paused/ UnPaused Session')
  }

  addlog = (text: string) => {
    this.logs.push(text)
  }
  */

}
