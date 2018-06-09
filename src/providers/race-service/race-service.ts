import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RegisterServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RaceServiceProvider {

  apiUrl = 'http://localhost:8000';
  constructor(public http: HttpClient) {
    console.log('Hello RaceServiceProvider Provider');
  }

  SimulateRace(user_id : string){
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/race/simulate/' + user_id).subscribe(data => {
        resolve(data);
      }), err => {
        console.log(err);
      }
    })
  }

  getTracks(){
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/track').subscribe(data => {
        resolve(data);
      }), err => {
        console.log(err);
      }
    })
  }

  getDriver(driver_id : string){
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/driver/'+driver_id).subscribe(data => {
        resolve(data);
      }), err => {
        console.log(err);
      }
    })
  }
}