import React from 'react';

class ControlPanel extends React.Component {
    render () {
        return (
            <div className="ControlPanel">
                <div className="buttons">
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
                <div>
                    Server Connection Status: 
                    <span className={this.props.connected ? 
                        (this.props.heartbeat ? "connected status" : "disconnected status") : 
                        "disconnected status"}>
                        {this.props.connected ? 
                            (this.props.heartbeat ? " Good" : " Bad") : 
                            " Disconnected"}
                    </span>
                </div> 
                <div>
                    Hardware Connection Status:
                </div>
            </div>

        )
    }
}

export default ControlPanel;