import {Component} from '@angular/core';

import jsonData from '../b.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'createGeoJSON';
  data: any[] = []


  runTest() {

    this.getResponse(jsonData.body)
//    this.log()
  }

  getResponse(parentnode: any[]) {
    for (let i = 0; i < parentnode.length; i++) {
      let inputRequestNode = JSON.parse(parentnode[i].InputRequest)
      inputRequestNode.geometry = []
      inputRequestNode.responseType = parentnode[i].ResponseType
      inputRequestNode.geometry.push(this.getGeometry(parentnode[i]))
      for (let j = 0; j<parentnode[i].Children.length; j++) {
        inputRequestNode.geometry.push(this.getGeometry(parentnode[i].Children[j]))
      }
      this.data.push(inputRequestNode)
    }
  }
  getGeometry(node: any) {
      let geometry = node.ResponseGeometry
      if (geometry === "Legal Not Found") {
        geometry = null
      }
      let geometryNode = geometry !== null ? JSON.parse(geometry) : '{}'
      return geometryNode
  }

  log() {
    for (let i = 0; i < this.data.length; i++) {
      console.log(`id: ${this.data[i].legalid} meridian: ${this.data[i].meridian} TWP: ${this.data[i].township} RGE: ${this.data[i].range}`)
      if (this.data[i].geometry) {
        for (let j = 0; j < this.data[i].geometry.length; j++) {
          console.log(`geometry: ${j}`)
          let rings: any[] = this.data[i].geometry[j].rings
          if (rings) {
            for (let k = 0; k < rings.length; k++) {
              console.log(`ring: ${k}`)
              for (let r = 0; r < rings[k].length; r++) {
                console.log(`coord: ${rings[k][r]}`)
              }
            }
          }
        }
      }
    }
  }
}
