import { Component } from '@angular/core';
import { NavController, Modal, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private modalController: ModalController) {}

  openModal() {
    const myModalOptions = {};

    const myModalData = {}

    const myModal: Modal = this.modalController.create('ModalPage', {data: myModalData}, myModalOptions);
    myModal.present();
  }
}
