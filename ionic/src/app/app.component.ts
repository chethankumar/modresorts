import {
  Component,
  ViewChild,
  Renderer,
  ChangeDetectorRef,
  NgModule
} from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LiveUpdateProvider } from '../providers/live-update/live-update';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ResortsPage } from '../pages/resorts/resorts';
import { ResortsdetailsPage } from '../pages/resortsdetails/resortsdetails';
import { MerchPage } from '../pages/merch/merch';
import { ChatbotPage } from '../pages/chatbot/chatbot';
import { AttractionsPage } from '../pages/attractions/attractions';
import { OtploginPage } from '../pages/otplogin/otplogin';

@Component({
  templateUrl: 'app.html'
})
@NgModule({
  providers: [LiveUpdateProvider]
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private renderer: Renderer,
    private cdr: ChangeDetectorRef,
    private liveUpdateService: LiveUpdateProvider
  ) {}
  initializeApp(renderer, cdr) {
    this.platform.ready().then(() => {
      this.rootPage = LoginPage;
      cdr.detectChanges();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initializePush();
    });
  }

  initializePush() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      MFPPush.initialize(
        function(successResponse) {
          MFPPush.registerNotificationsCallback(notificationReceived);
          WLAuthorizationManager.obtainAccessToken('push.mobileclient').then(
            function(accessToken) {
              MFPPush.registerDevice(null, successCallback, failureCallback);
            }
          );
        },
        function(failureResponse) {
          console.log('Failed to initialize');
        }
      );
    }
  }
}
declare let MFPPush: any;
let notificationReceived = function(message) {
  if (message.alert.body !== undefined) {
    alert(message.alert.body);
  } else {
    alert(message.alert);
  }
};
let successCallback = function(response) {
  console.log('Success: ' + JSON.stringify(response));
};
let failureCallback = function(response) {
  console.log('Error: ' + JSON.stringify(response));
};
