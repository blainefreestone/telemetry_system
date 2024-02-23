require(
  [
    "esri/config", 
    "esri/Map", 
    "esri/views/SceneView", 
    "esri/layers/FeatureLayer"
  ], function(esriConfig, Map, SceneView, FeatureLayer) {
  
    esriConfig.apiKey = "AAPK18b2e18170204bc6b4d16bee66e69afdkvVIvyYk4T2gtPkbxLqIWRX7Zxgpo_8fQYZ60kmRrsKvTtVNjto-_jzQ6UuD2Jy3";

    // Add parks with a class breaks renderer and unique symbols
    function createFillSymbol(value, color) {
      return {
        "value": value,
        "symbol": {
          "color": color,
          "type": "simple-fill",
          "style": "solid",
          "outline": {
            "style": "none"
          }
        },
        "label": value
      };
    }

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

    // Simple renderers

    const trailHeadsRenderer = {
      type: "simple",
      symbol: {
        type: "picture-marker",
        url: "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
        width: "18px",
        height: "18px"
      }
    };

    const trailsRenderer = { 
      type: "simple",
      symbol: {
        type: "simple-line",
        color: "#8A2BE2",
        style: "solid"
      },
      visualVariables: [
        {
          type: "size",
          field: "ELEV_GAIN",
          minDataValue: 0,
          maxDataValue: 2300,
          minSize: "3px",
          maxSize: "7px"
        }
      ]
    };

    const bikeTrailsRenderer = {
      type: "simple",
      symbol: {
        type: "simple-line",
        color: "#FF91FF",
        style: "solid"
      },
    };

    const parksRenderer = {
      type: "unique-value",
      field: "TYPE",
      uniqueValueInfos: [
        createFillSymbol("Natural Areas", "#9E559C"),
        createFillSymbol("Regional Parks", "#A7C636"),
        createFillSymbol("Open Space", "#149ECE"),
        createFillSymbol("Local Parks", "#ED5151")
      ]
    };

    // Feature layer styling misc.

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

    // Popup templates

    const trailheadsPopup = {
      "title": "Trailhead",
      "content": "<b>Trail:</b> {TRL_NAME}<br><b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
    }

    // Feature layers

    const trailheads = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
      renderer: trailHeadsRenderer,
      labelingInfo: [trailheadsLabels],
      outFields: ["TRL_NAME", "CITY_JUR", "X_STREET", "PARKING", "ELEV_FT"],
      popupTemplate: trailheadsPopup
    });

    const trails = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
      renderer: trailsRenderer,
      opacity: 0.75
    });

    const bikeTrails = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
      renderer1: bikeTrailsRenderer,
      definitionExpression: "USE_BIKE = 'YES'"
    });

    const parks = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0",
      renderer: parksRenderer,
      opacity: 0.2
    });

    // Add layers to the map

    map.add(trailheads);    // adds the trailheads to the map
    map.add(trails, 0);     // adds the trails to the map
    map.add(bikeTrails, 1); // adds the bike trails to the map
    map.add(parks, 0);      // adds the parks to the map 
});