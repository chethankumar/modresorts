import { Component, Renderer, NgZone } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { DataStore } from '../../app/dataStore';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import ChallengeHandler from '../../componentScripts/challengeHandler';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var CID: any;

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  constructor(
    public navCtrl: NavController,
    public renderer: Renderer,
    public dataStore: DataStore
  ) {
    this.challengeHandlerComponent = new ChallengeHandler(
      this.securityCheckName,
      err => {
        if (!err) {
          this.navCtrl.push(TabsPage);
          //this.navCtrl.navigateByUrl('/app/tabs/(home:home)');

          //this.navCtrl.rootNav.setRoot(TabsPage);
        }
      }
    );
  }

  challengeHandlerComponent: ChallengeHandler;
  username: string;
  password: string;

  login() {
    this.challengeHandlerComponent.login(this.username, this.password);
    this.dataStore.username = this.username;
  }

  securityCheckName = 'UserLogin';
  challHandlerSuccessPage = HomePage;

  faceid() {
    CID.checkAuth(
      'Login to Modresorts',
      () => {
        this.navCtrl.push(TabsPage);
      },
      () => {
        console.log('error in faceid');
      }
    );
  }
}
