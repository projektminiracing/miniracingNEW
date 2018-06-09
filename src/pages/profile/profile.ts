import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterServiceProvider } from '../../providers/register-service/register-service';

import { FabContainer } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user_profile: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public registerServiceProvider: RegisterServiceProvider) {
    this.user_profile = JSON.parse(localStorage.getItem("currentUser"));
  }

  share(socialNet: string, fab: FabContainer) {
    fab.close();
    console.log("Sharing in", socialNet);
  }

  updateUser(){
    console.log(JSON.stringify(this.user_profile));
    this.registerServiceProvider.updateUser(this.user_profile).then(data => {
      this.user_profile = data;
    })
  }

  logout(){ 
    localStorage.removeItem("currentUser");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
}