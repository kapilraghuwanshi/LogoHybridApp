import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlbumServiceProvider } from '../../providers/album-service/album-service';
import { LogoPage } from '../logo/logo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  albumDetails: any;

  constructor(public navCtrl: NavController, public albumService: AlbumServiceProvider) {
    //default load all logos detais from  API first 25 for ease/time
    this.albumService.fetchAlbumDetails()
      .then(data => {
        this.albumDetails = data;
        this.albumDetails = this.albumDetails.slice(1, 25);
        console.log(this.albumDetails);
      });
  }

  //Select particular logo and go to it's details
  goToSelectedLogo(selectedLogo) {
    this.navCtrl.push(LogoPage, selectedLogo);
  }

  //Fetch out all favourites logos stored in the SQLite
  getFavouriteAlbumData() {
    this.albumService.getAllFavoriteLogos()
      .then(data => {
        this.albumDetails = data;
        // console.log("Fav albumDetails " + this.albumDetails);
      });
  }

  //Go back to all logos
  goBackToAllLogos() {
    this.albumService.fetchAlbumDetails()
      .then(data => {
        this.albumDetails = data;
        this.albumDetails = this.albumDetails.slice(1, 25);
      });
  }

}
