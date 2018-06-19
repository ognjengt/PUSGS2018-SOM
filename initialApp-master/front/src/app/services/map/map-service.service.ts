import { Injectable } from '@angular/core';

import { GeoJson } from '../../models/map';
import * as mapboxgl from 'mapbox-gl';
import { apikey } from '../../../../keys';

@Injectable({
  providedIn: 'root'
})
export class MapServiceService {

  constructor() {
    mapboxgl.accessToken = apikey;
  }


  getMarkers() {
    //return this.db.list('/markers')
  }

  createMarker(data: GeoJson) {
    //return this.db.list('/markers').push(data)
  }

  removeMarker($key: string) {
    //return this.db.object('/markers/' + $key).remove()
  }

}
