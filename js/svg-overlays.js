/**
 * Creates an SVG for an orc with a specified size, using the orcSketch template from ./js/orc-sketch.js.
 * @param {number} size - The size of the SVG.
 * @param {number} rotation - The rotation angle in degrees.
 * @param {boolean} flipX - Whether to flip the SVG horizontally.
 * @param {boolean} flipY - Whether to flip the SVG vertically.
 * @returns {string} The SVG string.
 */
function createOrcSvg(size = 60, rotation = 0, flipX = false, flipY = false) {
  const scaleX = flipX ? -1 : 1;
  const scaleY = flipY ? -1 : 1;

  return `
    <svg width="${size}" height="${size}" viewBox="-5 0 120 120" 
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
    html: createOrcSvg(35, rotation, flipX, flipY),
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
    <svg width="${size}" height="${size}" viewBox="-40 0 550 400" 
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

/**
 * Creates an SVG for a russian flag, using the russiaFlag template from ./js/flag-sketches.js.
 * @param {number} size - The size of the SVG.
 * @returns {string} The SVG string.
 */
function createrussiaFlagSvg(size = 40) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 36 24"
    xmlns="http://www.w3.org/2000/svg">
      ${window.russiaFlag}
    </svg>
  `;
}

/**
 * Adds a russian flag marker to the map at the specified coordinates.
 * @param {number} lat - The latitude of the marker.
 * @param {number} lng - The longitude of the marker.
 * @returns {L.Marker} The added marker.
 */
function addrussiaFlagToMap(lat, lng) {
  const russiaFlagIcon = L.divIcon({
    html: createrussiaFlagSvg(40),
    className: 'russia-flag-marker',
    iconSize: [40, 27],    // 36:24 ratio
    iconAnchor: [20, 13]   // Center anchor
  });
  return L.marker([lat, lng], { icon: russiaFlagIcon }).addTo(window.map);
}

/**
 * Creates an SVG for a Ukraine flag, using the UkraineFlag template from ./js/flag-sketches.js.
 * @param {number} size - The size of the SVG.
 * @returns {string} The SVG string.
 */
function createUkraineFlagSvg(size = 40) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 36 24"
    xmlns="http://www.w3.org/2000/svg">
      ${window.UkraineFlag}
    </svg>
  `;
}

/**
 * Adds a Ukraine flag marker to the map at the specified coordinates.
 * @param {number} lat - The latitude of the marker.
 * @param {number} lng - The longitude of the marker.
 * @returns {L.Marker} The added marker.
 */
function addUkraineFlagToMap(lat, lng) {
  const UkraineFlagIcon = L.divIcon({
    html: createUkraineFlagSvg(40),
    className: 'ukraine-flag-marker',
    iconSize: [40, 27],    // 36:24 ratio ≈ 40:26.7
    iconAnchor: [20, 13]   // Center point
  });
  return L.marker([lat, lng], { icon: UkraineFlagIcon }).addTo(window.map);
}

addrussiaFlagToMap(51.380617, 36.319933, 0);
// Place orc near Belgorod
addOrcToMap(50.780617, 36.519933, 0);
// Place tank near Belgorod
addTankToMap(50.780617, 36.319933, 0, flipX = true, flipY = false);

// near Kyiv
addUkraineFlagToMap(49.251494, 32.516949, 0);
addTankToMap(49.651494, 32.516949, 0);