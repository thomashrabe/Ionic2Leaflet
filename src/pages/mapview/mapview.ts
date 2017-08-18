import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as Leaflet from "leaflet";
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-mapview',
  templateUrl: 'mapview.html',
  providers : [Geolocation]
})
export class LeafletView {

  private _currentLatLng: any;
  private _map: any;

  constructor(public navCtrl: NavController,
              private geolocation : Geolocation) {
    
  }

  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap(){
    this.geolocation.getCurrentPosition({ maximumAge: 60000, timeout: 30000, enableHighAccuracy: true }).then((position) => {
 
        this._currentLatLng = [position.coords.latitude, position.coords.longitude];
       
        this._map = Leaflet
          .map("map")
          .setView(this._currentLatLng, 13)
        
        // this.map.options.zoomControl = false;

        Leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(this._map);

     }, (error) => {
      console.log(error);
    });
  }

}
