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
        this.hoverPointGraphic = null;    // create a reference to the point being hovered over
    }

    // add a new point to the state
    addPoint = () => {
        // clear the graphics layer
        this.graphicsLayer.removeAll();
        // add all the points to the graphics layer
        this.props.pointGraphics.forEach((pointGraphic) => {
            this.graphicsLayer.add(pointGraphic);
        });
        // this.graphicsLayer.add(this.props.lastPointGraphic);
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

    // check if the line is being hovered over
    isHovered = (event) => {
        this.view.hitTest(event).then((response) => {
            if (response.results.length > 0 && response.results[0].graphic.geometry.type === "polyline") {
                // remove the previous hover point graphic from the graphics layer
                if (this.hoverPointGraphic) {
                    this.graphicsLayer.remove(this.hoverPointGraphic);
                }
 
                let lineVertexIndex = response.results[0].vertexIndex;
    
                if (this.props.pointGraphics[lineVertexIndex]) {
                    this.hoverPointGraphic = this.props.pointGraphics[lineVertexIndex];

                    this.graphicsLayer.add(this.hoverPointGraphic);
                }
            }
        });
    }

    componentDidUpdate(prevProps) {
        // check if the pointGraphics prop has changed
        if (prevProps.pointGraphics !== this.props.pointGraphics) {
            // update the last point on the map
            this.addPoint(this.props.lastPointGraphic);

            if (this.hoverPointGraphic) {
                console.log(this.hoverPointGraphic.geometry.x, this.hoverPointGraphic.geometry.y, this.hoverPointGraphic.geometry.z);
                // update the hover point graphic
                this.graphicsLayer.add(this.hoverPointGraphic);
            }

            // update the line on the map
            this.updateLine(this.props.pointGraphics);
        }
    }

    componentDidMount() {
        if (this.mapDiv.current) {
            const {
                apiKey,
                basemapConfig,
                getSceneViewConfig,
                markerSymbol,
                pointPopupTemplate,
                lineSymbol
            } = mapConfig;

            Config.apiKey = apiKey;

            // Create the Map
            this.map = new Map(basemapConfig);

            // Create the SceneView
            this.view = new SceneView(getSceneViewConfig(this.mapDiv, this.map));

            // Create a graphics layer to hold the points and lines
            this.graphicsLayer = new GraphicsLayer();
            this.map.add(this.graphicsLayer);

            // Create a symbol with style for the points
            this.markerSymbol = markerSymbol;

            // Create a popup template for the points
            this.pointPopupTemplate = pointPopupTemplate;

            // Create the style for the line
            this.lineSymbol = lineSymbol;

            // Create event for hovering over the line
            this.view.on("pointer-move", this.isHovered);
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
