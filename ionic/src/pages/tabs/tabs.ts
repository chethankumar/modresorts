import { Component, Renderer } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';
import { ResortsPage } from '../resorts/resorts';
import { MerchPage } from '../merch/merch';
import { ChatbotPage } from '../chatbot/chatbot';
import { AttractionsPage } from '../attractions/attractions';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = ResortsPage;
  tab2Root = MerchPage;
  tab3Root = ChatbotPage;
  tab4Root = SettingsPage;

  constructor(public navCtrl: NavController, public renderer: Renderer) {}
}
