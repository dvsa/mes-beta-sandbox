import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PetService, Pet} from '../../api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private petService: PetService) {}

    addPet() {
      this.petService.addPet({
        id: 1,
        category: {
          id: 1,
          name: 'Dog'
        },
        name: 'Fred',
        photoUrls: []
      }).subscribe(value => console.log('ADD PET' , value));
    }

    getPet() {
      this.petService.getPetById(1).subscribe(value => console.log('GET PET', value));
    }


}
