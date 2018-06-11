import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RaceServiceProvider } from '../../providers/race-service/race-service';

import { AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public raceServiceProvider : RaceServiceProvider, private alertController: AlertController) {
    this.getVehicle();
    this.getDriver();
    this.upgradesLeft = 5;
  }

  getVehicle(){
    this.raceServiceProvider.getVehicle(JSON.parse(localStorage.getItem("currentUser"))._id).then(data => {
      this.vehicle = data[0];
      console.log("VEHICLE");
      console.log(this.vehicle);
    })
  }

  getDriver(){
    this.raceServiceProvider.getDriver(JSON.parse(localStorage.getItem("currentUser"))._id).then(data => {
      this.driver = data[0];
      console.log("DRIVER");
      console.log(this.driver);
    })
  }

  upgrade(choice: string, attribute: string, value: number) {
    if(this.upgradesLeft != 0){
      if(choice == "driver"){
        console.log("voznik", attribute, value);
        this.driver[attribute] += value;
        console.log(this.driver);
        
        this.upgradesLeft--;
        this.raceServiceProvider.upgradeDriver(this.driver).then(data => {
          this.driver = data;
          console.log(this.driver);
        })
      }
      if(choice == "vehicle"){
        console.log("vozilo", attribute, value);
        if(attribute == "engineBC")
          this.vehicle["engine"]["batteryConsumption"] -= value;
        else if(attribute == "engineHS")
          this.vehicle["engine"]["horsePower"] += value;
        else
          this.vehicle[attribute] += value;

        this.upgradesLeft--;
        this.raceServiceProvider.upgradeVehicle(this.vehicle).then(data => {
          this.vehicle = data;
          console.log(this.vehicle);
        })
        console.log(this.vehicle);
      }
    }
    else{
      this.alert();
    }
  }

  alert(){
    if(this.upgradesLeft == 0){
      let alert = this.alertController.create({
        title: 'No points left!',
        subTitle: 'Head over to the race tab and join a race to gain more upgrade points.',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareerPage');
  }
}
