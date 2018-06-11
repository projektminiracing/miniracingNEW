import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterServiceProvider } from '../../providers/register-service/register-service';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { FabContainer } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user_profile: any;
  photoHost='http://localhost:8000/';
  fileToUpload: File = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public registerServiceProvider: RegisterServiceProvider) { //private camera
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

  handleFileInput(files: FileList){
    this.fileToUpload = files.item(0);
  }

  updateProfilePicture(){
    if(this.fileToUpload != null){
      this.registerServiceProvider.updateProfilePicture(this.fileToUpload,this.user_profile._id).then(data =>{
        this.user_profile = data;
      })
    }
  }
  /*
  takePicture(){
    const options: CameraOptions = {
			quality : 75,
      destinationType : this.camera.DestinationType.DATA_URL,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    }
    this.camera.getPicture(options).then((imageData) => {
			let cameraImageSelector = document.getElementById('camera-image');
			let image = "data:image/jpeg;base64," + imageData;
			cameraImageSelector.setAttribute('src', image );
  			}, (err) => {
			 console.log(err);
		});	
  }
  */

  logout(){ 
    localStorage.removeItem("currentUser");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
}