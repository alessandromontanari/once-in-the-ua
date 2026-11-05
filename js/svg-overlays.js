/**
 * Creates an SVG for an orc with a specified size, using the orcSketch template from ./js/orc-sketch.js.
 * @param {number} size - The size of the SVG.
 * @param {number} rotation - The rotation angle in degrees.
 * @param {boolean} flipX - Whether to flip the SVG horizontally.
 * @param {boolean} flipY - Whether to flip the SVG vertically.
 * @returns {string} The SVG string.
 */
function createOrcSvg(size = 40, rotation = 0, flipX = false, flipY = false) {
  const scaleX = flipX ? -1 : 1;
  const scaleY = flipY ? -1 : 1;

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 110 120" 
    xmlns="http://www.w3.org/2000/svg" 
    style="transform: rotate(${rotation}deg) scale(${scaleX}, ${scaleY}); transform-origin: center;">
      ${window.orcSketch}
    </svg>
  `;
}

/**
 * Adds an orc marker to the map at the specified coordinates.
 * @param {number} lat - The latitude of the marker.
 * @param {number} lng - The longitude of the marker.
 * @param {number} rotation - The rotation angle in degrees.
 * @param {boolean} flipX - Whether to flip the SVG horizontally.
 * @param {boolean} flipY - Whether to flip the SVG vertically.
 * @returns {L.Marker} The added marker.
 */
function addOrcToMap(lat, lng, rotation = 0, flipX = false, flipY = false) {
  const orcIcon = L.divIcon({
    html: createOrcSvg(40, rotation, flipX, flipY),
    className: 'orc-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });

  return L.marker([lat, lng], { icon: orcIcon }).addTo(window.map);
}

/**
 * Creates an SVG for a tank with a specified size, using the tankSketch template from ./js/tank-sketch.js.
 * @param {number} size - The size of the SVG.
 * @param {number} rotation - The rotation angle in degrees.
 * @param {boolean} flipX - Whether to flip the SVG horizontally.
 * @param {boolean} flipY - Whether to flip the SVG vertically.
 * @returns {string} The SVG string.
 */
function createTankSvg(size = 60, rotation = 0, flipX = false, flipY = false) {
  const scaleX = flipX ? -1 : 1;
  const scaleY = flipY ? -1 : 1;
  
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 500 400" 
    xmlns="http://www.w3.org/2000/svg" 
    style="transform: rotate(${rotation}deg) scale(${scaleX}, ${scaleY}); transform-origin: center;">
      ${window.tankSketch}
    </svg>
  `;
}

/**
 * Adds a tank marker to the map at the specified coordinates.
 * @param {number} lat - The latitude of the marker.
 * @param {number} lng - The longitude of the marker.
 * @param {number} rotation - The rotation angle in degrees.
 * @param {boolean} flipX - Whether to flip the SVG horizontally.
 * @param {boolean} flipY - Whether to flip the SVG vertically.
 * @returns {L.Marker} The added marker.
 */
function addTankToMap(lat, lng, rotation = 0, flipX = false, flipY = false) {
  const tankIcon = L.divIcon({
    html: createTankSvg(60, rotation, flipX, flipY),
    className: 'tank-marker',
    iconSize: [60, 60],
    iconAnchor: [30, 30]
  });
  return L.marker([lat, lng], { icon: tankIcon }).addTo(window.map);
}

// Place orc near Belgorod
addOrcToMap(50.780617, 36.519933, 0);
// Place tank near Belgorod
addTankToMap(50.780617, 36.319933, 0, flipX = true, flipY = false);

addTankToMap(49.251494, 32.516949, 0);