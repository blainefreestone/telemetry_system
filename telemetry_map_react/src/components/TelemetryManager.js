import React from 'react';
import MapComponent from './MapComponent';
import RealTimeDataDisplay from './RealTimeDataDisplay';

class TelemetryManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            points: [],
        }
    }

    connectToServer = () => {
        // connect to the server
        this.socket = io('http://127.0.0.1:5000');

        // listen for data from server
        this.socket.on('data', (data) => {
            // when data is receieved
            this.handleDataReceived(data);
        });
    }

    handleDataReceived = (data) => {
        // add the new point to the state
        this.setState(prevState => ({
            points: [...prevState.points, this.createPoint(data)],
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

    render() {
        return (
            <>
                <MapComponent />
                <RealTimeDataDisplay />
            </>
        )
    }
}

export default TelemetryManager;