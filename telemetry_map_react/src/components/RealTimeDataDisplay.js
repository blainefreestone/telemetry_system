import React from 'react';

class RealTimeDataDisplay extends React.Component {
    constructor(props) {
        super(props);
        // set initial state
        this.state = {
            point: null,
        }
    }

    componentDidUpdate(prevProps) {
        // check if the point prop has changed
        if (prevProps.point !== this.props.point) {
            // update the state with the new point
            this.setState({
                point: this.props.point,
            });
        }
    }

    render () {
        return (
            // display the state values in a table
            <>
                <table>
                    <tbody>
                        {this.state.point ? (
                            <>
                                <tr>
                                    <td>Longitude</td>
                                    <td>{this.state.point.x + '°' ? this.state.point.x : ''}</td>
                                </tr>
                                <tr>
                                    <td>Latitude</td>
                                    <td>{this.state.point.y + '°' ? this.state.point.y : ''}</td>
                                </tr>
                                <tr>
                                    <td>Altitude</td>
                                    <td>{this.state.point.z + '°' ? this.state.point.z : ''}</td>
                                </tr>
                                <tr>
                                    <td>Roll</td>
                                    <td>{this.state.point.roll ? this.state.point.roll + '°' : ''}</td>
                                </tr>
                                <tr>
                                    <td>Pitch</td>
                                    <td>{this.state.point.pitch ? this.state.point.pitch + '°' : ''}</td>
                                </tr>
                                <tr>
                                    <td>Yaw</td>
                                    <td>{this.state.point.yaw ? this.state.point.yaw + '°' : ''}</td>
                                </tr>
                            </>
                        ) : (
                            <>
                                <tr>
                                    <td>Longitude</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Latitude</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Altitude</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Roll</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Pitch</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Yaw</td>
                                    <td></td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>
            </>
        );
    }
}

export default RealTimeDataDisplay;