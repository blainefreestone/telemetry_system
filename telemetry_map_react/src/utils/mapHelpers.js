// returns list of points with x, y, and z, coordinates in the form of an arc
const createArc = (start, end, maxHeight, numPoints) => {
    const points = [];
    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      const x = start.x + t * (end.x - start.x);
      const y = start.y + t * (end.y - start.y);
      const z = maxHeight * (1 - (2*t - 1)**2);
      points.push({ x, y, z });
    }
    return points;
}

// export the createArc function
export { createArc };