import { Component, ViewEncapsulation } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage {


  loginDetails = {};

  constructor(private global: GlobalService) {

  }

  submitForm() {
    this.global.navigateToURL('/dashboard', []);
    // this.global.showLoading('Logging you in');
    // this.global.postRequest('https://vast-earth-78951.herokuapp.com/user', this.loginDetails).then(response => {
    //   this.global.hideLoading();
    //   this.global.navigateToURL('/dashboard', []);
    // })
    //   .catch(error => {
    //     this.global.hideLoading();
    //     this.global.presentAlert(error.error);
    //   })
  }

}
