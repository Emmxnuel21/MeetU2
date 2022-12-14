import { Component } from '@angular/core';
import { Geolocation, Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';
import { ViewChild, ElementRef } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  map: any;
  jaja: any;

  constructor(private geolocation: Geolocation) { }

  ionViewDidEnter(){
    this.showMap();
  }

  ngAfterViewInit(){
    this.geolocationNative();
  }
  
  geolocationNative(){
    this.geolocation.getCurrentPosition().then((geposition: Geoposition) => {
      this.jaja = geposition;
      console.log(geposition);
    })
  }
  
  showMap(){
    const location = new google.maps.LatLng(this.jaja.coords.latitude,this.jaja.coords.longitude);
    const options = {
      center: location,
      zoom: 18,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  }

}
