import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-appsee',
  templateUrl: 'appsee.html',
})
export class AppseePage {

  apiKey: string = '9a42c4bb456143a29fe591b760a6ce07'

  appSee = (<any>window).Appsee;


  constructor(public navCtrl: NavController) {
  }

  startRecording = () => {
    this.appSee.start(this.apiKey);
  }



}
