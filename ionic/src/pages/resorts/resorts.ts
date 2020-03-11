import { Component, Renderer, NgZone, ViewChild } from '@angular/core';
import {
  NavController,
  ModalController,
  Slides,
  Platform
} from 'ionic-angular';
import { DataStore } from '../../app/dataStore';
import { ResortsdetailsPage } from '../resortsdetails/resortsdetails';

@Component({
  selector: 'page-resorts',
  templateUrl: 'resorts.html'
})
export class ResortsPage {
  @ViewChild(Slides) slides: Slides;

  constructor(
    public navCtrl: NavController,
    public renderer: Renderer,
    public dataStore: DataStore,
    public platform: Platform
  ) {
    this.getResortsData();
  }
  

  showFeedback() {
    WLAuthorizationManager.obtainAccessToken().then(
      function(accessToken) {
        WL.Analytics.triggerFeedbackMode();
      },
      function(error) {
        alert('Failed to connect to MobileFirst Server');
      }
    );
  }

  username = (this.dataStore as any).username || 'USER';
  slidesData: Array<Object> = [];

  slideOptions = {
    initialSlide: 0
  };
  activeSlide: Object = {};
  viewPlatform = '';

  //   navgation to details page
  getSlideDetails() {
    this.navCtrl.push(
      ResortsdetailsPage,
      { itemDetails: this.activeSlide },
      { animate: false }
    );
  }
  getSlideDetailsWeb(index) {
    this.activeSlide = this.slidesData[index];
    this.navCtrl.push(
      ResortsdetailsPage,
      { itemDetails: this.activeSlide },
      { animate: false }
    );
  }

  ngOnInit() {
    // this.activeSlide = this.slidesData[0];
  }
  ionViewWillEnter() {
    if (this.platform.is('core')) {
      this.viewPlatform = 'web';
    } else {
      this.viewPlatform = 'mobile';
    }
  }
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    this.activeSlide = this.slidesData[currentIndex];

    // remove and apply fade in effect
    const fadeElement = document.getElementsByClassName('content-wrapper')[0];
    this.fade(fadeElement);
  }
  fade(element) {
    var op = 0.1; // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function() {
      if (op >= 1) {
        clearInterval(timer);
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ')';
      op += op * 0.1;
    }, 20);
  }

  getResortsData() {
    var self = this;
    var resourceRequest = new WLResourceRequest(
      'http://localhost:3000/resorts',
      WLResourceRequest.GET,
      { useAPIProxy: false }
    );
    resourceRequest.send().then(
      function(response) {
        // alert('Success: ' + response.responseText);
        self.slidesData = JSON.parse(response.responseText);
        self.activeSlide = self.slidesData[0];

        // WLAuthorizationManager.obtainAccessToken().then(
        //   function(accessToken) {
        //     WL.Analytics.triggerFeedbackMode();
        //   },
        //   function(error) {
        //     alert('Failed to connect to MobileFirst Server');
        //   }
        // );
      },
      function(response) {
        alert('Failure: ' + JSON.stringify(response));
      }
    );
  }
}
