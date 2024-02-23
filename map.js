require(["esri/config", "esri/Map", "esri/views/MapView"], function(esriConfig, Map, MapView) {
  
    esriConfig.apiKey = "AAPK18b2e18170204bc6b4d16bee66e69afdkvVIvyYk4T2gtPkbxLqIWRX7Zxgpo_8fQYZ60kmRrsKvTtVNjto-_jzQ6UuD2Jy3";

    const map = new Map({
      basemap: "arcgis/topographic" // basemap styles service
    });

    const view = new MapView({
    map: map,
    center: [-118.805, 34.027], // Longitude, latitude
    zoom: 13, // Zoom level
    container: "viewDiv" // Div element
  });

});