const mapConfig = {
    apiKey: "AAPK18b2e18170204bc6b4d16bee66e69afdkvVIvyYk4T2gtPkbxLqIWRX7Zxgpo_8fQYZ60kmRrsKvTtVNjto-_jzQ6UuD2Jy3",
    basemapConfig: {
        basemap: "arcgis/topographic",  // basemap styles service
        ground: "world-elevation"       // elevation styles service
    },
    markerSymbol: {
        type: "simple-marker",
        color: [226, 119, 40], // Orange
        outline: {
            color: [200, 200, 200], // Grey
            width: .75
        },
        size: 5 // Adjust the size value to make the symbol smaller
    },
    pointPopupTemplate: {
        title: "Information",
        content: "Latitude: {x} <br> Longitude: {y} <br> Altitude: {z} meters"
    },
    lineSymbol: {
        type: "simple-line",
        color: [226, 119, 40], // Orange
        width: 4
    }
}

export default mapConfig;