import React from 'react';

class ControlPanel extends React.Component {
    render () {
        return (
            <div className="ControlPanel">
                {this.props.connected ? 
                    <button onClick={this.props.connectToServer} disabled>Connected</button> :
                    <button onClick={this.props.connectToServer}>Connect to Server</button>
                }
            </div>
        )
    }
}

export default ControlPanel;