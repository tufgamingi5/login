import { Component } from '@angular/core';
import {Platform} from '@ionic/angular'

// import {SplashScreen} from '@awesome-cordova-plugins/splash-screen/ngx';
// import {StatusBar} from '@awesome-cordova-plugins/status-bar/ngx';
import {Storage} from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [Storage]
})
export class AppComponent {
  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    // private statusBar: StatusBar,
    // private splashscreen: SplashScreen,
    private storage: Storage,
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.storage.create();


    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashscreen.hide();
    });

    this.storage.get('isLoggedIn').then((val) => {
      if (val == null || val == undefined || val == '') {
        this.navCtrl.navigateRoot('/login')
      } else {
        this.navCtrl.navigateRoot('/tabs/tab1')
      }
    });
  }
}
