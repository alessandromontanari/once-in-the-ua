/**
 * Creates an SVG for an orc with a specified size, using the orcSketch template from ./js/orc-sketch.js.
 * @param {number} size - The size of the SVG.
 * @returns {string} The SVG string.
 */
function createOrcSvg(size = 40) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 110 120" xmlns="http://www.w3.org/2000/svg">
      ${window.orcSketch}
    </svg>
  `;
}

/**
 * Adds an orc marker to the map at the specified coordinates.
 * @param {number} lat - The latitude of the marker.
 * @param {number} lng - The longitude of the marker.
 * @returns {L.Marker} The added marker.
 */
function addOrcToMap(lat, lng) {
  const orcIcon = L.divIcon({
    html: createOrcSvg(40),
    className: 'orc-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });

  return L.marker([lat, lng], { icon: orcIcon }).addTo(window.map);
}

/**
 * Creates an SVG for a tank with a specified size, using the tankSketch template from ./js/tank-sketch.js.
 * @param {number} size - The size of the SVG.
 * @returns {string} The SVG string.
 */
function createTankSvg(size = 60) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
      ${window.tankSketch}
    </svg>
  `;
}

/**
 * Adds a tank marker to the map at the specified coordinates.
 * @param {number} lat - The latitude of the marker.
 * @param {number} lng - The longitude of the marker.
 * @returns {L.Marker} The added marker.
 */
function addTankToMap(lat, lng) {
  const tankIcon = L.divIcon({
    html: createTankSvg(60),
    className: 'tank-marker',
    iconSize: [60, 60],
    iconAnchor: [30, 30]
  });
  return L.marker([lat, lng], { icon: tankIcon }).addTo(window.map);
}

// Place orc near Belgorod
addOrcToMap(50.780617, 36.519933);
// Place tank near Belgorod
addTankToMap(50.780617, 36.319933);