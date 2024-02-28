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
            connected: false,
            heartbeat: false,
            hardware: false,
            hardwareHeartbeat: false
        }
    }

    connectToServer = () => {
        // connect to the server
        this.socket = io('http://127.0.0.1:5000');

        // set the state to connected if the connection is successful
        this.socket.on('connect', () => {
            // listen for data from server
            this.socket.on('pointData', (data) => {
                // when data is receieved
                this.handleDataReceived(data);
            });

            this.socket.on('heartbeat', (data) => {
                let newState;

                // clear the previous timeout as heartbeat was received
                clearTimeout(this.heartbeatTimeout);
                // set new timeout for next heartbeat
                this.heartbeatTimeout = setTimeout(this.handleMissedHeartbeat, 2000);

                data.hardware === true ? newState = {heartbeat: true, hardware: true} : newState = {heartbeat: true, hardware: false};

                // set the heartbeat state to true
                this.setState(newState);
            });
            
            this.setState({
                connected: true,
                points: [],
                pointGraphics: []
            });
        });
        
        this.socket.on('connect_error', () => {
            // stop trying to connect if the connection failed
            this.socket.close();
        });

        this.socket.on('disconnect', () => {
            // set the state to disconnected if the connection is lost
            this.setState({
                connected: false,
                hardware: false,
                heartbeat: false
            });

            // stop trying to connect
            this.socket.close();
        });
    }

    disconnectFromServer = () => {
        // disconnect from the server
        this.socket.close();
    }

    requestData = () => {
        // request data from the server
        this.socket.emit('trigger');
    }

    sendFileData = () => {
        const { file } = this.ControlPanel.state;

        const fileReader = new FileReader();

        // send the file when it has been read by the fileReader
        fileReader.onload = (event) => {
            // parse the JSON data from the file
            const fileData = JSON.parse(event.target.result);

            // send the file data to the server
            this.socket.emit('fileData', fileData);

            this.ControlPanel.setState({
                file: null
            });
        }
        // read the file as text
        fileReader.readAsText(file);   
    }

    handleDataReceived = (data) => {
        const point = this.createPoint(data);
        // add the new point to the state
        this.setState(prevState => ({
            points: [...prevState.points, point],
            pointGraphics: [...prevState.pointGraphics, this.createPointGraphic(point)]
        }));
    }

    handleMissedHeartbeat = () => {
        this.setState({
            heartbeat: false
        });
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
                <ControlPanel
                    connectToServer={this.connectToServer}
                    disconnectFromServer={this.disconnectFromServer}
                    requestData={this.requestData}
                    sendFileData={this.sendFileData}
                    connected={this.state.connected}
                    heartbeat={this.state.heartbeat}
                    hardware={this.state.hardware}
                    hardwareHeartbeat={this.state.hardwareHeartbeat}
                    ref = {ref => this.ControlPanel = ref}
                />
            </>
        )
    }
}

export default TelemetryManager;