require(
  [
    "esri/config", 
    "esri/Map", 
    "esri/views/SceneView", 
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
  ], function(esriConfig, Map, SceneView, Graphic, GraphicsLayer) {
  
    esriConfig.apiKey = "AAPK18b2e18170204bc6b4d16bee66e69afdkvVIvyYk4T2gtPkbxLqIWRX7Zxgpo_8fQYZ60kmRrsKvTtVNjto-_jzQ6UuD2Jy3";

    // Base map

    const map = new Map({
      basemap: "arcgis/topographic",  // basemap styles service
      ground: "world-elevation"       // elevation styles service
    });

    const view = new SceneView({
      container: "viewDiv",
      map: map,
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

    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    const point = {
      type: "point",
      longitude: -118.80500,
      latitude: 34.02700
    }

    const markerSymbol = {
      type: "simple-marker",
      color: [226, 119, 40],
      outline: {
        color: [255, 255, 255],
        width: 1
      }
    }

    const pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol
    });

    graphicsLayer.add(pointGraphic);
});