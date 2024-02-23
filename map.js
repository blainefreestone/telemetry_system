// creates dummy data for the map points and lines in the form of an arc
function createArc(start, end, maxHeight, numPoints = 100) {
  const points = [];
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const x = start.x + t * (end.x - start.x);
    const y = start.y + t * (end.y - start.y);
    const z = maxHeight * (1 - (2*t - 1)**2);
    points.push({ x, y, z });
  }
  return points;
}

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

    const markerSymbol = {
      type: "simple-marker",
      color: [169, 169, 169], // Grey
      size: 3 // Adjust the size value to make the symbol smaller
    };

    const pointsData = createArc(
      { x: -118.821527826096, y: 34.0139576938577 },  // start of arc
      { x: -118.508878330345, y: 33.9816642996246 },  // end of arc
      10000,                                          // max height of arc
      numPoints = 100                                 // number of points in arc
    )

    pointsData.forEach((current_point) => {
      const point = {
        type: "point",
        x: current_point.x,
        y: current_point.y,
        z: current_point.z
      }

      const pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol
      });

      graphicsLayer.add(pointGraphic);
    });

    const lineSymbol = {
      type: "simple-line",
      color: [226, 119, 40],
      width: 4
    }

    const polyline = {
      type: "polyline",
      paths: pointsData.map((point) => [point.x, point.y, point.z])
    }

    const polylineGraphic = new Graphic({
      geometry: polyline,
      symbol: lineSymbol
    });
    
    graphicsLayer.add(polylineGraphic);
});