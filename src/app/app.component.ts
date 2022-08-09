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
    for (let i = 0; i < body.length; i++) {
      let inputRequestNode = JSON.parse(body[i].InputRequest)
      let geometry = JSON.parse(body[i].ResponseGeometry)
      let feature = JSON.parse('{"type": "Feature", "geometry": {"type": "Polygon", "coordinates": []}, "properties": {}}')

      if (geometry != null && geometry != "Legal Not Found") {
        for (let r = 0; r < geometry.rings.length; r++) {
          feature.geometry.coordinates.push(geometry.rings[r])
        }
      }
      feature.properties = jobData.find(record => record.legalid === inputRequestNode.legalid )
      this.geoJSON.features.push(feature)
    }

    this.jsonString = JSON.stringify(this.geoJSON, null, 2)
  }
}
