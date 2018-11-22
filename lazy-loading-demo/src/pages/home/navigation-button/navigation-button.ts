import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'navigation-button',
  templateUrl: 'navigation-button.html',
})
export class NavigationButton {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
