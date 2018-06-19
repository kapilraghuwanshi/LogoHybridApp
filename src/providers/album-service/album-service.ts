import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

const STORAGE_KEY = 'favoriteLogos';

@Injectable()
export class AlbumServiceProvider {

  albumUrl: string = 'https://jsonplaceholder.typicode.com/photos';
  albumData: any;

  constructor(public http: Http, private storage: Storage) {
    console.log('Hello AlbumServiceProvider Provider');
  }

  //Initially fetch data from API
  fetchAlbumDetails() {
    return new Promise(resolve => {
      this.http.get(this.albumUrl)
        .map(resp => resp.json())
        .subscribe(tempData => {
          this.albumData = tempData;
          resolve(this.albumData);
        });
    });
  }

  //Get All stored favorites
  getAllFavoriteLogos() {
    return this.storage.get(STORAGE_KEY);
  }

  //Check data is favourite or not - return true/false
  isFavorite(LogoDetail) {
    return this.getAllFavoriteLogos().then(result => {
      return result && result.indexOf(LogoDetail) !== -1;
    });
  }

  //Add to Favourite object in local storage
  favoriteLogo(LogoDetail) {
    return this.getAllFavoriteLogos().then(result => {
      if (result) {
        result.push(LogoDetail);
        return this.storage.set(STORAGE_KEY, result);
      }
      else {
        return this.storage.set(STORAGE_KEY, [LogoDetail]);
      }
    });
  }

  //Remove from favorite object in local storage
  unfavoriteLogo(LogoDetail) {
    return this.getAllFavoriteLogos().then(result => {
      // console.log("unfavoriteLogo " + result);
      if (result) {
        var index = result.indexOf(LogoDetail);
        // console.log("indexunfavor " + index);
        result.splice(index, 1);
        return this.storage.set(STORAGE_KEY, result);
      }
    });
  }


}
