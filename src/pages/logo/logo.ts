import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AlbumServiceProvider } from '../../providers/album-service/album-service';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-logo',
  templateUrl: 'logo.html',
  providers: [File, FileTransfer, FileTransferObject]
})
export class LogoPage {

  logoDetails: any;
  isFavorite = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public albumService: AlbumServiceProvider,
    public filetransfer: FileTransfer, private file: File) {

    this.logoDetails = this.navParams.get('selectedLogo');
    //check clicked logo is already favorite or not
    this.albumService.isFavorite(this.logoDetails).then(isFav => {
      this.isFavorite = isFav;
    })
  }

  //select and make it favourite
  selectFavoriteLogo() {
    this.albumService.favoriteLogo(this.logoDetails).then(() => {
      this.isFavorite = true;
    });
  }

  //select and unfavorite it
  selectUnfavoriteLogo() {
    this.albumService.unfavoriteLogo(this.logoDetails).then(() => {
      this.isFavorite = false;
    });
  }

  //download the logo image
  DownloadLogo() {
    const fileTransferObj: FileTransferObject = this.filetransfer.create();

    const imgPathUrl = this.logoDetails.url;
    const imgDownloadPath = this.file.externalDataDirectory + 'myImage.jpg';

    fileTransferObj.download(imgPathUrl, imgDownloadPath, true)
      .then((entry) => {
        alert('Download complete for your image at : ' + entry.toURL());
      });

    this.navCtrl.pop();
  }

  //open the pop up for more information
  CheckInfoDetails() {
    let alert = this.alertCtrl.create({
      title: 'More Information',
      subTitle: 'Album id - ' + this.logoDetails.albumId + " & " + 'Logo id - ' + this.logoDetails.id,
      buttons: ['Done']
    });
    alert.present();
  }

}
