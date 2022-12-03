import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private storage: Storage,
    private navCtrl: NavController
  ) {
    this.storage.get('isLoggedIn').then((val) => {
      console.log(val);
      if (val == false) {
        this.navCtrl.navigateRoot('/login')
      }
    });
  }

  async logout(){
    this.storage.clear();
    localStorage.clear();
    this.navCtrl.navigateRoot('/login')
  }

}
