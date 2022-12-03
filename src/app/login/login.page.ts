import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email_address: string = "";
    password: string = "";

    disabledButton = false;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storage: Storage,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  async presentToast(a: any){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500
    });
    toast.present();
  }

  async trylogin(){

    if(this.email_address===""){
      this.presentToast('your email address is required');
    }else if(this.password===""){
      this.presentToast('your password is required')
    }

      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message:'Please wait....',
      });
      loader.present();

      const fd = new FormData();
      fd.append('email_address', this.email_address);
      fd.append('password', this.password);

      try{
        const res = await axios.post('http://localhost/api-crud/api/login.php',fd);
        console.log(res);
        if(res.data.error == false){
          loader.dismiss();
          this.disabledButton = false;
          this.presentToast('Login Sukses')
          this.storage.set('isLoggedIn', res.data.result);
          localStorage.setItem('isLoggedIn', res.data.result);
          this.navCtrl.navigateRoot(['/tabs/tab1']);
        }
        else{
          this.presentToast(res.data.result.message);
        }
      }
      catch(err){
        loader.dismiss();
        this.presentToast(err);
      }

  }
}
