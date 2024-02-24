import React from 'react';
import { createArc } from '../utils/mapHelpers';

// responsible for adding a new point to the map
// will use createArc function to iteratively add points to a map
const AddPoint = (props) => {
    const handleSubmit = () => {
        const points = createArc(
            { x: -118.821527826096, y: 34.0139576938577 },  // start of arc
            { x: -118.508878330345, y: 33.9816642996246 },  // end of arc
            10000,                                          // max height of arc
            100                                             // number of points in arc
        )
        points.forEach((point, index) => {
            setTimeout(() => {
                props.addPoint(point);
            }, index * 100); // Wait half a second (500 milliseconds) for each point
        });
    }
    
    // return a button that will begin to add points to the map
    return (
        <div>
            <button onClick={handleSubmit}>Add Points</button>
        </div>
    )
}

export default AddPoint;