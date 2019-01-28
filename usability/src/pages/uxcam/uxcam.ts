import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-uxcam',
  templateUrl: 'uxcam.html',
})
export class UxcamPage {

   
  uxCam = (<any>window).UXCam;
  apiKey = '3r69p8gxk3v80m8'

  constructor(public navCtrl: NavController) {

  }
  startRecording() {
    this.uxCam.startWithKey(this.apiKey);
  };


  buttonPress(buttonNumber: number) {
    this.uxCam.logEvent('I clicked button' + buttonNumber);
  }
}
