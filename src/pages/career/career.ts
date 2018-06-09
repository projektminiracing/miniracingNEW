import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RaceServiceProvider } from '../../providers/race-service/race-service';

/**
 * Generated class for the CareerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-career',
  templateUrl: 'career.html',
})
export class CareerPage {
  _driver : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public raceServiceProvider : RaceServiceProvider) {
    this.getDriver();
  }

  getDriver(){
    this.raceServiceProvider.getDriver('5b046a8830c28f357c59415f').then(data => {
      this._driver = data;
      console.log(this._driver);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareerPage');
  }
}
