import React, { useEffect, useRef } from 'react';
import Config from '@arcgis/core/config';
import Map from '@arcgis/core/Map';
import SceneView from '@arcgis/core/views/SceneView';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.mapDiv = React.createRef();
  }

  componentDidMount() {
    if (this.mapDiv.current) {
      Config.apiKey = "AAPK18b2e18170204bc6b4d16bee66e69afdkvVIvyYk4T2gtPkbxLqIWRX7Zxgpo_8fQYZ60kmRrsKvTtVNjto-_jzQ6UuD2Jy3";

      // Create the Map
      const map = new Map({
        basemap: "arcgis/topographic",  // basemap styles service
        ground: "world-elevation"       // elevation styles service
      });

      // Create the SceneView
      const view = new SceneView({
        container: this.mapDiv.current,   // HTML element to place the map
        map: map,
        // starting position of the camera
        camera: {
          position: [
            -118.80500, // lon
            34.02700,   // lat
            2500        // elevation in meters
          ],
          tilt: 65,
          heading: 360
        }
      });
    }
  }

  render() {
    return (
      <div ref={this.mapDiv} style={{ width: '100%', height: '100vh' }}></div>
    );
  }
}

export default MapComponent;
