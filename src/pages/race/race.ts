import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RaceServiceProvider } from '../../providers/race-service/race-service';

import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the RacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-race',
  templateUrl: 'race.html',
})
export class RacePage {

  results : any;
  display_results: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public raceServiceProvider : RaceServiceProvider, public loadingController: LoadingController) {
    this.display_results = false;
  }

  SimulateRace(){
    this.raceServiceProvider.SimulateRace(JSON.parse(localStorage.getItem("currentUser"))._id).then(data => {
      this.results = data;
      this.display_results = true;
      console.log(JSON.stringify(this.results));
    })
  }

  loadingFunction() {
    let loading = this.loadingController.create({
      content: 'Driving through section...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RacePage');
  }
}