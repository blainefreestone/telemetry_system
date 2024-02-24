import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Config from '@arcgis/core/config';
import Map from '@arcgis/core/Map';
import SceneView from '@arcgis/core/views/SceneView';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

const MapComponent = () => {
  const mapDiv = useRef(null);

  useEffect(() => {
  if (mapDiv.current) {
    Config.apiKey = "AAPK18b2e18170204bc6b4d16bee66e69afdkvVIvyYk4T2gtPkbxLqIWRX7Zxgpo_8fQYZ60kmRrsKvTtVNjto-_jzQ6UuD2Jy3";

    // Create the Map
    const map = new Map({
      basemap: "arcgis/topographic",  // basemap styles service
      ground: "world-elevation"       // elevation styles service
    });

    // Create the SceneView
    const view = new SceneView({
      container: mapDiv.current,   // HTML element to place the map
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

    // Create the GraphicsLayer
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);
  }
  }, []);

  return (
    <div ref={mapDiv} style={{width: '100%', height: '100vh'}}></div>
  );
}

export default MapComponent;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
