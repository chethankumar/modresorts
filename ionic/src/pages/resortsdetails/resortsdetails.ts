import { Component, Renderer, NgZone } from '@angular/core';
import {
  NavController,
  ModalController,
  NavParams,
  Platform,
  ToastController
} from 'ionic-angular';
import { DataStore } from '../../app/dataStore';

@Component({
  selector: 'page-resortsdetails',
  templateUrl: 'resortsdetails.html'
})
export class ResortsdetailsPage {
  itemDetails = {};
  constructor(
    public navCtrl: NavController,
    public renderer: Renderer,
    public dataStore: DataStore,
    public navParams: NavParams,
    public platform: Platform,
    public toastCtrl: ToastController
  ) {
    this.itemDetails = navParams.data.itemDetails;

    // LiveUpdateManager.obtainConfiguration(
    //   {
    //     segmentId: 'all',
    //     useClientCache: true
    //   },
    //   function(configuration) {
    //     // Control a feature using live update

    //     var myFeature = configuration.features['bookButton'];
    //     if (myFeature !== undefined) {
    //       (<HTMLElement>(
    //         document.querySelector('[studio-id="bookbtn"]')
    //       )).style.visibility = myFeature == true ? 'visible' : 'hidden';
    //     }
    //   },
    //   function(error) {
    //     console.log(
    //       'ObtainConfiguration failed with error: ' + JSON.stringify(error)
    //     );
    //   }
    // );
  }

  viewPlatform: string = '';
  ionViewWillEnter() {
    if (this.platform.is('core')) {
      this.viewPlatform = 'web';
    } else {
      this.viewPlatform = 'mobile';
    }
  }

  bookingDate = '';

  handleButtonClick() {
    console.log('clicked');
    const toast = this.toastCtrl.create({
      message: 'Resort booked successfully for ' + this.bookingDate,
      duration: 3000
    });
    toast.present();
  }

  feedback() {
    console.log('inside feedback');
    WLAuthorizationManager.obtainAccessToken().then(
      function(accessToken) {
        WL.Analytics.triggerFeedbackMode();
      },
      function(error) {
        alert('Failed to connect to MobileFirst Server');
      }
    );
  }
}
