import React from 'react';

class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        }
    }
    
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

    handleFileChange = (event) => {
        // add file to state
        this.setState({
            file: event.target.files[0]
        })
    }
    
    render () {
        return (
            <div className="ControlPanel">
                <div className="connection">
                    <div className="buttons">
                        {this.props.connected ? 
                            <button onClick={() => {
                                if (window.confirm('Are you sure you want to connect to the server? Doing this will clear current map data.')) {
                                    this.props.connectToServer();
                                }
                            }} disabled>Connected</button> :
                            <button onClick={() => {
                                if (window.confirm('Are you sure you want to connect to the server? Doing this will clear current map data.')) {
                                    this.props.connectToServer();
                                }
                            }}>Connect to Server</button>
                        }
                        {this.props.connected ? 
                            <button onClick={() => {
                                if (window.confirm('Are you sure you want to disconnect from the server?')) {
                                    this.props.disconnectFromServer();
                                }
                            }}>Disconnect from Server</button> :
                            null
                        }
                        {this.props.connected ? 
                            <button onClick={() => {
                                if (window.confirm('Are you sure you want to request data?')) {
                                    this.props.requestData();
                                }
                            }}>Request Data</button> :
                            null
                        }
                    </div>
                    {this.renderConnectionStatus()}
                    {this.renderHardwareConnectionStatus()}
                </div>
                <div className="fileUpload">
                    Upload file to server:
                    <div><input type="file" accept=".json" onChange={this.handleFileChange} /></div>
                    <div><button onClick={this.props.sendFileData} disabled={!this.state.file || !this.props.connected}>Send File</button></div>
                </div>
                <div className="fileDownload">
                    Download current map data:
                    <div><button onClick={this.props.downloadDataAsFile}>Download</button></div>
                </div>
            </div>
        )
    }
}

export default ControlPanel;