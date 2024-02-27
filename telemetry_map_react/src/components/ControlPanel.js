import React from 'react';

class ControlPanel extends React.Component {
    renderConnectionStatus = () => {
        let divText, divClass;

        if (this.props.connected) {
            if (this.props.heartbeat) {
                divText = " Good";
                divClass = " connected status";
            } else {
                divText = " Bad";
                divClass = " disconnected status";
            }
        } else {
            divText = " Disconnected";
            divClass = " disconnected status";
        }

        return (
            <div>
                Server Connection Status: 
                <span className = {divClass} >
                    {divText}
                </span>
            </div> 
        )
    }

    renderHardwareConnectionStatus = () => {
        let show, divText, divClass;

        if (this.props.hardware && this.props.connected) {
            if (this.props.hardwareHeartbeat) {
                show = true;
                divText = " Good";
                divClass = " connected status";
            } else {
                show = true;
                divText = " Bad";
                divClass = " disconnected status";
            }
        } else if (this.props.connected) {
            show = true;
            divText = " Disconnected";
            divClass = " disconnected status";
        } else {
            show = false;
        }

        if (show) {
            return (
                <div>
                    Hardware Connection Status: 
                    <span className = {divClass} >
                        {divText}
                    </span>
                </div>
            )
        }
    }
    
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
                    {this.renderConnectionStatus()}
                <div>
                    {this.renderHardwareConnectionStatus()}
                </div>
            </div>

        )
    }
}

export default ControlPanel;