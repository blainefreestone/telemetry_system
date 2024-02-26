import React from 'react';

class ControlPanel extends React.Component {
    render () {
        return (
            <div className="ControlPanel">
                {this.props.connected ? 
                    <button onClick={this.props.connectToServer} disabled>Connected</button> :
                    <button onClick={this.props.connectToServer}>Connect to Server</button>
                }
                {this.props.connected ? 
                    <button onClick={this.props.disconnectFromServer}>Disconnect from Server</button> :
                    null
                }
                {this.props.connected ? 
                    <button onClick={this.props.requestData}>Request Data</button> :
                    null
                }
            </div>
        )
    }
}

export default ControlPanel;