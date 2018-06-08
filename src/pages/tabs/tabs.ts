import { Component } from '@angular/core';

import { RegisterPage } from '../register/register';
import { RacePage } from '../race/race';
import { LoginPage } from '../login/login';
import { TracksPage } from '../tracks/tracks';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  loginTab = LoginPage;
  registerTab = RegisterPage;
  tracksTab = TracksPage;
  raceTab = RacePage;
  profileTab = ProfilePage;

  constructor() {

  }

  isLoggedIn(){
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    else{
      return false;  
    }
  }
}
