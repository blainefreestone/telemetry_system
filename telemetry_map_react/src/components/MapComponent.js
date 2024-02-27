import React from 'react';
import Config from '@arcgis/core/config';
import Map from '@arcgis/core/Map';
import SceneView from '@arcgis/core/views/SceneView';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import mapConfig from '../config/mapConfig';

// component to get and update map div
class MapComponent extends React.Component {
    constructor(props) {
        super(props);
        this.mapDiv = React.createRef();  // create a reference to the map div
    }

    // add a new point to the state
    addPoint = (pointGraphic) => {
        // clear the graphics layer
        this.graphicsLayer.removeAll();

        // add the points to the graphics layer
        this.props.pointGraphics.forEach((pointGraphic) => {
            this.graphicsLayer.add(pointGraphic);
        });
    }

    updateLine = (pointGraphics) => {
        // create a new line from the points
        const line = {
            type: "polyline",
            paths: pointGraphics.map((pointGraphic) => [pointGraphic.geometry.x, pointGraphic.geometry.y, pointGraphic.geometry.z])
        }

        // create a new line graphic
        const lineGraphic = new Graphic({
            geometry: line,
            symbol: this.lineSymbol
        });

        // add the line to the graphics layer
        this.graphicsLayer.add(lineGraphic);
    }

    componentDidUpdate(prevProps) {
        // check if the pointGraphics prop has changed
        if (prevProps.pointGraphics !== this.props.pointGraphics) {
            // update the points on the map
            this.addPoint(this.props.lastPointGraphic);
            // update the line on the map
            this.updateLine(this.props.pointGraphics);
        }
    }

    componentDidMount() {
        if (this.mapDiv.current) {
            const {
                apiKey,
                basemapConfig,
                markerSymbol,
                pointPopupTemplate,
                lineSymbol
            } = mapConfig;

            Config.apiKey = apiKey;

            // Create the Map
            this.map = new Map(basemapConfig);

            // Create the SceneView
            this.view = new SceneView(mapConfig.getSceneViewConfig(this.mapDiv, this.map));

            // Create a graphics layer to hold the points and lines
            this.graphicsLayer = new GraphicsLayer();
            this.map.add(this.graphicsLayer);

            // Create a symbol with style for the points
            this.markerSymbol = markerSymbol;

            // Create a popup template for the points
            this.pointPopupTemplate = pointPopupTemplate;

            // Create the style for the line
            this.lineSymbol = lineSymbol;
        }
    }

    render() {
        return (
            <>
                <div className="mapDiv" ref={this.mapDiv}></div>
            </>
        );
    }
}

export default MapComponent;
