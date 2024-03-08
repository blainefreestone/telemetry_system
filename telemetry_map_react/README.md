# Overview

The React application is designed to showcase an interactive 3D map using the ArcGIS API, dynamically updated with telemetry data received from a server. Users can observe real-time data and utilize button controls for managing connections and data reception within the application environment.

This React application is part of a comprehensive project aimed at developing a real-time telemetry collection and display system. For details about the broader system, refer to the documentation [here](..). Additional information about the server can be found [here](./telemetry_map_server), and details regarding the telemetry circuit are available [here](./telemetry_circuit_sketch).

[Software Demo Video](http://youtube.link.goes.here)

# How to Use

### To start this React application:

1. Ensure you have Node.js installed on your system.
2. Open a terminal window and navigate to the root directory of your React application.
3. Run the command `npm install` to install dependencies.
4. Once the installation is complete, execute `npm start` to launch the development server.
5. The React application should automatically open in your default web browser at `http://localhost:3000`.

Before running, many useful assets from the ArcGIS API will be copied to the `public/assets` directory which is in the .gitignore file. These assets are important for the React application to run smoothly.

### Connection with the server and receiving data:

The application is configured to communicate with the NodeJS server in this repo. With the server running, click the `Connect to Server` button to establish the connection.

Be aware that disconnecting from the server will reset all map data previously received from the server.

# Language and Resources Used

1. **JavaScript:** The application is primarily written in JavaScript, leveraging the React framework for building user interfaces and managing state.

2. **ArcGIS API for JavaScript:** The ArcGIS API for JavaScript is utilized to incorporate powerful mapping and spatial analysis capabilities into the application. It provides access to mapping services, spatial data visualization, and geoprocessing functionalities.

3. **React:** The React library is employed to create reusable components and efficiently manage the application's user interface. React's component-based architecture promotes modular development and enhances code maintainability.

4. **Node.js and npm:** Node.js and npm (Node Package Manager) are used for managing project dependencies and executing build scripts. npm facilitates the installation of third-party libraries and tools required for development and deployment.

I developed this using the Visual Studio Code IDE

# Useful Websites

{Make a list of websites that you found helpful in this project}
* [Web Site Name](http://url.link.goes.here)
* [Web Site Name](http://url.link.goes.here)

# Future Work

{Make a list of things that you need to fix, improve, and add in the future.}
* Item 1
* Item 2
* Item 3docs/troubleshooting#npm-run-build-fails-to-minify)
