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
  driver : any;
  vehicle : any;

  upgradesLeft : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public raceServiceProvider : RaceServiceProvider) {
    this.getDriver();
    this.getVehicle();
    this.upgradesLeft = 1;
  }

  getDriver(){
    this.raceServiceProvider.getDriver(JSON.parse(localStorage.getItem("currentUser"))._id).then(data => {
      this.driver = data;
      console.log(this.driver);
    })
  }

  getVehicle(){
    this.raceServiceProvider.getVehicle(JSON.parse(localStorage.getItem("currentUser"))._id).then(data => {
      this.vehicle = data;
      console.log(this.vehicle);
    })
  }

  upgrade(choice: string, attribute: string, value: number) {
    if(choice == "driver"){
      if(this.upgradesLeft != 0){
        console.log("voznik", attribute, value);
        this.driver[0][attribute] += value;
        console.log(this.driver);
        
        this.upgradesLeft--;
        this.raceServiceProvider.upgradeDriver(this.driver).then(data => {
          this.driver = data;
          console.log(this.driver);
        })
      }
    }
    if(choice == "vehicle"){
      if(this.upgradesLeft != 0){
        console.log("vozilo", attribute, value);
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareerPage');
  }
}
