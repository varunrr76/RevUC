import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-augment-credit',
  templateUrl: './augment-credit.page.html',
  styleUrls: ['./augment-credit.page.scss'],
})
export class AugmentCreditPage implements OnInit {

  androidReady = false;

  constructor(private platform: Platform,
    private splashScreen: SplashScreen,
    private androidPermissions: AndroidPermissions) {

    this.platform.ready().then((readySource) => {

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        result => (this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
      );

      this.androidReady = true;
    });
  }

  ngOnInit() {
  }

}
