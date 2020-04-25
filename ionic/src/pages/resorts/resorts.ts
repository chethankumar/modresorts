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
    // this.gotoChatbot();
  }
  

  showFeedback() {
    WLAuthorizationManager.obtainAccessToken().then(
      function(accessToken) {
        // WL.Analytics.triggerFeedbackMode();
      },
      function(error) {
        alert('Failed to connect to MobileFirst Server');
      }
    );
  }

  username = (this.dataStore as any).username || 'Steve';
  slidesData: Array<Object> = [];

  slideOptions = {
    initialSlide: 3,
    direction: 'horizontal',
    autoplay: 1000
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
        self.activeSlide = self.slidesData[2];

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

  gotoChatbot() {
    this.navCtrl.parent.select(3);
  }

  // listen() {
  //   console.log('listen');
  //   let initParams: any = {
  //     AssistantURL:
  //       'https://gateway.watsonplatform.net/assistant/api/v2/assistants/929c8b11-31cc-4d68-ac94-b91b30ed8c89/sessions',
  //     ApiKey: 'Qhq_8ImcmabnjiA95hBBC-Nbd693RgyfGsyQFzLpDKNs'
  //   };
  //   MFVoice.init(initParams);
  //   var map = {};
  //   map['Show_Resorts'] = this.gotoChatbot();
  //   MFVoice.registerIntentMap(map);
  //   MFVoice.listenToVoiceCommand();
  // }
}
