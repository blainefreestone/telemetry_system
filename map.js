require(
  [
    "esri/config", 
    "esri/Map", 
    "esri/views/SceneView", 
    "esri/layers/FeatureLayer"
  ], function(esriConfig, Map, SceneView, FeatureLayer) {
  
    esriConfig.apiKey = "AAPK18b2e18170204bc6b4d16bee66e69afdkvVIvyYk4T2gtPkbxLqIWRX7Zxgpo_8fQYZ60kmRrsKvTtVNjto-_jzQ6UuD2Jy3";

    const map = new Map({
      basemap: "arcgis/topographic" // basemap styles service
    });

    const view = new SceneView({
      map: map,
      center: [-118.80543,34.02700], // Longitude, latitude
      zoom: 13, // Zoom level
      container: "viewDiv" // Div element
    });

    const trailHeadsRenderer = {
      type: "simple",
      symbol: {
        type: "picture-marker",
        url: "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
        width: "18px",
        height: "18px"
      }
    };

    const trailheadsLabels = {
      symbol: {
        type: "text",
        color: "#FFFFFF",
        haloColor: "#5E8D74",
        haloSize: "2px",
        font: {
          size: "12px",
          family: "Noto Sans",
          style: "italic",
          weight: "normal"
        }
      },

      labelPlacement: "above-center",
      labelExpressionInfo: {
        expression: "$feature.TRL_NAME"
      }
    };

    const trailheads = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
      renderer: trailHeadsRenderer,
      labelingInfo: [trailheadsLabels]
    });

    const trails = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0"
    });

    const parks = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0",
    });

    map.add(trailheads);  // adds the trailheads to the map
    map.add(trails, 0);   // adds the trails to the map
    map.add(parks, 0);    // adds the parks to the map 
});