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
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>Z</th>
                    </tr>
                    {this.state.point && (
                        <tr>
                            <td>{this.state.point.x}</td>
                            <td>{this.state.point.y}</td>
                            <td>{this.state.point.z}</td>
                        </tr>
                    )}
                </table>
            </>
        )
    }
}

export default RealTimeDataDisplay;