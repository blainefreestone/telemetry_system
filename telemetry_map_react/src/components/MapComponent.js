import React from 'react';
import Config from '@arcgis/core/config';
import Map from '@arcgis/core/Map';
import SceneView from '@arcgis/core/views/SceneView';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import AddPoint from './AddPoint';

// component to get and update map div
class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.addPoint = this.addPoint.bind(this);
    this.mapDiv = React.createRef();  // create a reference to the map div
    this.state = {
      points: [], // array to hold the points
    }
  }

  // add a new point to the state
  addPoint = (pointValues) => {
    // convert the point values into a point object
    const point = {
      type: "point",
      x: pointValues.x,
      y: pointValues.y,
      z: pointValues.z
    }

    // Create a graphic for the new point
    const pointGraphic = new Graphic({
      geometry: point,
      symbol: this.markerSymbol,
      outFields: ["*"],
      attributes: {
        x: point.x,
        y: point.y,
        z: Math.round(point.z)
      },
      popupTemplate: this.pointPopupTemplate,
    })

    this.setState(prevState => ({
      points: [...prevState.points, pointGraphic], // add the new point to the array
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.points !== this.state.points) {
      // clear the graphics layer
      this.graphicsLayer.removeAll();

      // add the points to the graphics layer
      this.state.points.forEach((point) => {
        this.graphicsLayer.add(point);
      });

      // create a new line from the points
      const line = {
        type: "polyline",
        paths: this.state.points.map((point) => [point.geometry.x, point.geometry.y, point.geometry.z])
      }

      // create a new line graphic
      const lineGraphic = new Graphic({
        geometry: line,
        symbol: this.lineSymbol
      });

      // add the line to the graphics layer
      this.graphicsLayer.add(lineGraphic);
    }
  }

  componentDidMount() {
    if (this.mapDiv.current) {
      Config.apiKey = "AAPK18b2e18170204bc6b4d16bee66e69afdkvVIvyYk4T2gtPkbxLqIWRX7Zxgpo_8fQYZ60kmRrsKvTtVNjto-_jzQ6UuD2Jy3";

      // Create the Map
      this.map = new Map({
        basemap: "arcgis/topographic",  // basemap styles service
        ground: "world-elevation"       // elevation styles service
      });

      // Create the SceneView
      this.view = new SceneView({
        container: this.mapDiv.current,   // HTML element to place the map
        map: this.map,
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

      // Create a graphics layer to hold the points and lines
      this.graphicsLayer = new GraphicsLayer();
      this.map.add(this.graphicsLayer);

      // Create a symbol with style for the points
      this.markerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40], // Orange
        outline: {
          color: [200, 200, 200], // Grey
          width: .75
        },
        size: 5 // Adjust the size value to make the symbol smaller
      };

      // Create a popup template for the points
      this.pointPopupTemplate = {
      title: "Information",
      content: "Latitude: {x} <br> Longitude: {y} <br> Altitude: {z} meters"
      };

      // Create the style for the line
      const lineSymbol = {
        type: "simple-line",
        color: [226, 119, 40], // Orange
        width: 4
      };
    }
  }

  render() {
    return (
      <>
        <div ref={this.mapDiv} style={{ width: '90%', height: '90vh' }}></div>
        <AddPoint  addPoint={this.addPoint}/>
      </>
    );
  }
}

export default MapComponent;
