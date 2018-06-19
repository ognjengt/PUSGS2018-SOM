import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson, FeatureCollection } from '../../../models/map';
import { MapServiceService } from '../../../services/map/map-service.service';
import { apikey } from '../../../../../keys';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css'],
  providers: [MapServiceService]
})
export class MapBoxComponent implements OnInit {

  /// default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lat = 45.2671;
  lng = 19.8335;
  message = 'Hello World!';

  // data
  source: any;
  markers: any;

  constructor(private mapService: MapServiceService) {
    mapboxgl.accessToken = apikey;
  }

  ngOnInit() {
    //this.markers = this.mapService.getMarkers()
    this.initializeMap()
  }

  private initializeMap() {
    
    this.buildMap()

    this.map.flyTo({
      center: [this.lng, this.lat]
    })
    

  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });


    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());


    //// Add Marker on Click
    this.map.on('click', (event) => {
      const coordinates = [event.lngLat.lng, event.lngLat.lat]
      const newMarker   = new GeoJson(coordinates, { message: this.message })
      //this.mapService.createMarker(newMarker)
    })


    /// Add realtime firebase data on map load
    this.map.on('load', (event) => {

      /// register source
      this.map.addSource('firebase', {
         type: 'geojson',
         data: {
           type: 'FeatureCollection',
           features: []
         }
      });

      /// get source
      this.source = this.map.getSource('firebase')

      /// subscribe to realtime database and set data source
      // this.markers.subscribe(markers => {
      //     let data = new FeatureCollection(markers)
      //     this.source.setData(data)
      // })

      /// create map layers with realtime data
      this.map.addLayer({
        id: 'firebase',
        source: 'firebase',
        type: 'symbol',
        layout: {
          'text-field': '{message}',
          'text-size': 24,
          'text-transform': 'uppercase',
          'icon-image': 'rocket-15',
          'text-offset': [0, 1.5]
        },
        paint: {
          'text-color': '#f16624',
          'text-halo-color': '#fff',
          'text-halo-width': 2
        }
      })

    })

  }


  /// Helpers

  removeMarker(marker) {
    //this.mapService.removeMarker(marker.$key)
  }

  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates
    })
  }

}
