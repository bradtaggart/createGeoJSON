import {Component} from '@angular/core';

import jsonData from '../b.json';
import jobData from '../b-job.json'
import {anySymbolName} from "@angular/core/schematics/migrations/typed-forms/util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'createGeoJSON';
  data: any[] = []
  geoJSON: any
  jsonString: string = '';


  constructor() {
    this.processResponse(jsonData.body)
  }

  private processResponse(body: any[]) {
    this.geoJSON = JSON.parse('{ "type": "FeatureCollection", "features": []}')

    body.forEach((response) => {
      let legalid = JSON.parse(response.InputRequest).legalid
      let responseGeometry = JSON.parse(response.ResponseGeometry)
      let feature = JSON.parse('{"type": "Feature", "geometry": {"type": "Polygon", "coordinates": []}, "properties": {}}')

      if (responseGeometry != null && responseGeometry != "Legal Not Found") {
        responseGeometry.rings.forEach((ring: any[]) => {
          feature.geometry.coordinates.push(ring)
        })

        feature.properties = jobData.find(record => record.legalid === legalid)
        this.geoJSON.features.push(feature)
      }
    })

    this.jsonString = JSON.stringify(this.geoJSON, null, 2)
  }

}
