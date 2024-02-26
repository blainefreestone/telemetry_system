import React from 'react';
import MapComponent from './MapComponent';
import RealTimeDataDisplay from './RealTimeDataDisplay';
import ControlPanel from './ControlPanel';
import Graphic from '@arcgis/core/Graphic';
import mapConfig from '../config/mapConfig';
import io from 'socket.io-client';

class TelemetryManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            points: [],
            pointGraphics: [],
            connected: false
        }
    }

    connectToServer = () => {
        // connect to the server
        this.socket = io('http://127.0.0.1:5000');

        // set the state to connected if the connection is successful
        this.socket.on('connect', () => {
            // listen for data from server
            this.socket.on('data', (data) => {
                // when data is receieved
                this.handleDataReceived(data);
            });
            
            this.setState({
                connected: true
            });
        });
        
        this.socket.on('connect_error', () => {
            // stop trying to connect if the connection failed
            this.socket.close();
        });

        this.socket.on('disconnect', () => {
            // set the state to disconnected if the connection is lost
            this.setState({
                connected: false
            });

            // stop trying to connect
            this.socket.close();
        });
    }

    handleDataReceived = (data) => {
        const point = this.createPoint(data);
        // add the new point to the state
        this.setState(prevState => ({
            points: [...prevState.points, point],
            pointGraphics: [...prevState.pointGraphics, this.createPointGraphic(point)]
        }));
    }

    createPoint = (pointData) => {
        // create a new point
        const point = {
            type: "point",
            x: pointData.x,
            y: pointData.y,
            z: pointData.z
        }

        return point;
    }

    createPointGraphic = (point) => {
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

        return pointGraphic;
    }

    componentDidMount() {
        this.pointPopupTemplate = mapConfig.pointPopupTemplate;
    }

    render() {
        // get the last point from the state if it exists
        const lastPoint = this.state.points.length > 0 ? this.state.points[this.state.points.length - 1] : null;
        const lastPointGraphic = lastPoint ? this.createPointGraphic(lastPoint) : null;

        return (
            <>
                <div className="top-section">
                    <MapComponent pointGraphics = {this.state.pointGraphics} lastPointGraphic = {lastPointGraphic} />
                    <div className="realTimeDataDisplay"><RealTimeDataDisplay point = {lastPoint} /></div>
                </div>
                <ControlPanel connectToServer = {this.connectToServer} connected = {this.state.connected} />
            </>
        )
    }
}

export default TelemetryManager;