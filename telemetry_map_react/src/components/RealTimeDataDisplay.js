import React from 'react';

class RealTimeDataDisplay extends React.Component {
    constructor(props) {
        super(props);
        // set initial state
        this.state = {
            x: 0,
            y: 0,
            z: 0,
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
                    <tr>
                        <td>{this.state.x}</td>
                        <td>{this.state.y}</td>
                        <td>{this.state.z}</td>
                    </tr>
                </table>
            </>
        )
    }
}

export default RealTimeDataDisplay;