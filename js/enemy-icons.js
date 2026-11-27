/**
 * Enemy Icons Module
 * Fetches enemy position data and provides functions to display icons on the map.
 * Data format: { "unit_name": ["icon_type", [longitude, latitude]] }
 */

// Store the enemy positions data globally
window.enemyPositionsIcons = null;

/**
 * Mapping from icon types to their corresponding addToMap functions.
 * Each function receives: (lat, lng, rotation, flipX, flipY)
 */
const iconTypeToFunction = {
    'tank': addTankToMap,
    'parachute': addParachuteToMap,
    'special_forces': addSpecialForcesToMap,
    'artillery': addArtilleryToMap,
    'anchor': addMarinesToMap,
    'engineer': addEngineerToMap,
    'binoculars': addReconToMap,
    'fighter_jet': addAirToMap,
    'shield_rosguard': addRosguardToMap,
    'reserve': addBARSToMap,
    'volunteer': addVolunteerToMap,
    'shield': addCombinedArmsToMap,
    'infantry_fighting_vehicle': addMotorizedRifleToMap,
    'infantry': addInfantryToMap
};

/**
 * SVG path definitions (without dimensions) for simple icons
 */
const svgPaths = {
    parachute: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>`,
    special_forces: `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>`,
    artillery: `<path d="M15 11V5c0-1.1-.9-2-2-2H9v6H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V13c0-1.1-.9-2-2-2h-4zm-5-2h2V5H10v4zM5 19V9h4v10H5zm14 0V9h-4v10h4z"/>`,
    marines: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>`,
    engineer: `<path d="M11 9H9v2h2v-2zm0 4H9v2h2v-2zm4-4h-2v2h2v-2zm-2 4h-2v2h2v-2zm4-2h-2v2h2v-2zM3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2zm0 4h18v2H3v-2z"/>`,
    binoculars: `<path d="M12 6c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zm0-8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>`,
    air: `<path d="M10 18h4v-6h-4v6zm-4 0h4v-2H6v2zm10 0h4v-2h-4v2zM6 6l2-2h8l2 2v8H6V6zm2 2h8v4H8V8zm2 2v2h4v-2h-4z"/>`,
    rosguard: `<path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>`,
    reserve: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>`,
    volunteer: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>`,
    combined_arms: `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>`,
    motorized_rifle: `<path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7H5v2h14V4zM7 7v2H5V7h2zm4 0v2H9V7h2zm4 0v2h-2V7h2zm4 0v2h-2V7h2zM7 13v2H5v-2h2zm4 0v2H9v-2h2zm4 0v2h-2v-2h2zm4 0v2h-2v-2h2z"/>`,
    infantry: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>`
};

/**
 * Icon type to viewBox mapping
 */
const iconViewBoxes = {
    'tank': "-40 0 550 400",
    'default': "0 0 24 24"
};

/**
 * Icon type to default size mapping
 */
const iconSizes = {
    'tank': { width: 60, height: 60 },
    'default': { width: 40, height: 40 }
};

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
 * Create SVG for a generic icon type with optional rotation and flipping.
 * @param {string} iconType - The type of icon to create.
 * @param {number} size - The size of the SVG.
 * @param {number} rotation - The rotation angle in degrees.
 * @param {boolean} flipX - Whether to flip the SVG horizontally.
 * @param {boolean} flipY - Whether to flip the SVG vertically.
 * @returns {string} The SVG string.
 */
function createIconSvg(iconType, size = 40, rotation = 0, flipX = false, flipY = false) {
    // Tank uses a special SVG creation function
    if (iconType === 'tank') {
        return createTankSvg(size, rotation, flipX, flipY);
    }
    
    const path = svgPaths[iconType];
    if (!path) {
        console.warn(`No SVG path for icon type: ${iconType}, using default`);
        return createIconSvg('infantry', size, rotation, flipX, flipY);
    }
    
    const scaleX = flipX ? -1 : 1;
    const scaleY = flipY ? -1 : 1;
    const viewBox = iconViewBoxes[iconType] || iconViewBoxes.default;
    const actualSize = size;
    
    return `
        <svg width="${actualSize}" height="${actualSize}" viewBox="${viewBox}"
        xmlns="http://www.w3.org/2000/svg" fill="currentColor"
        style="transform: rotate(${rotation}deg) scale(${scaleX}, ${scaleY}); transform-origin: center;">
            ${path}
        </svg>
    `;
}

/**
 * Add a generic icon marker to the map at the specified coordinates.
 * @param {number} lat - The latitude of the marker.
 * @param {number} lng - The longitude of the marker.
 * @param {string} iconType - The type of icon to display.
 * @param {number} size - The size of the icon.
 * @param {number} rotation - The rotation angle in degrees.
 * @param {boolean} flipX - Whether to flip the SVG horizontally.
 * @param {boolean} flipY - Whether to flip the SVG vertically.
 * @returns {L.Marker} The added marker.
 */
function addGenericIconToMap(lat, lng, iconType, size = 40, rotation = 0, flipX = false, flipY = false) {
    const iconSvg = createIconSvg(iconType, size, rotation, flipX, flipY);
    const dimensions = iconSizes[iconType] || iconSizes.default;
    const actualSize = (iconType === 'tank') ? dimensions.width : size;
    
    const icon = L.divIcon({
        html: iconSvg,
        className: `enemy-icon ${iconType}-marker`,
        iconSize: [actualSize, actualSize],
        iconAnchor: [actualSize / 2, actualSize / 2]
    });
    return L.marker([lat, lng], { icon: icon }).addTo(window.map);
}

/**
 * Add parachute icon to map
 * @param {number} lat - The latitude of the marker.
 * @param {number} lng - The longitude of the marker.
 * @param {number} rotation - The rotation angle in degrees.
 * @param {boolean} flipX - Whether to flip the SVG horizontally.
 * @param {boolean} flipY - Whether to flip the SVG vertically.
 * @returns {L.Marker} The added marker.
 */
function addParachuteToMap(lat, lng, rotation = 0, flipX = false, flipY = false) {
    return addGenericIconToMap(lat, lng, 'parachute', 40, rotation, flipX, flipY);
}

/**
 * Add special forces icon to map
 * @param {number} lat - The latitude of the marker.
 * @param {number} lng - The longitude of the marker.
 * @param {number} rotation - The rotation angle in degrees.
 * @param {boolean} flipX - Whether to flip the SVG horizontally.
 * @param {boolean} flipY - Whether to flip the SVG vertically.
 * @returns {L.Marker} The added marker.
 */
function addSpecialForcesToMap(lat, lng, rotation = 0, flipX = false, flipY = false) {
    return addGenericIconToMap(lat, lng, 'special_forces', 40, rotation, flipX, flipY);
}

/**
 * Add artillery icon to map
 * @param {number} lat - The latitude of the marker.
 * @param {number} lng - The longitude of the marker.
 * @param {number} rotation - The rotation angle in degrees.
 * @param {boolean} flipX - Whether to flip the SVG horizontally.
 * @param {boolean} flipY - Whether to flip the SVG vertically.
 * @returns {L.Marker} The added marker.
 */
function addArtilleryToMap(lat, lng, rotation = 0, flipX = false, flipY = false) {
    return addGenericIconToMap(lat, lng, 'artillery', 40, rotation, flipX, flipY);
}

/**
 * Add marines icon to map
 * @param {number} lat - The latitude of the marker.
 * @param {number} lng - The longitude of the marker.
 * @param {number} rotation - The rotation angle in degrees.
 * @param {boolean} flipX - Whether to flip the SVG horizontally.
 * @param {boolean} flipY - Whether to flip the SVG vertically.
 * @returns {L.Marker} The added marker.
 */
function addMarinesToMap(lat, lng, rotation = 0, flipX = false, flipY = false) {
    return addGenericIconToMap(lat, lng, 'marines', 40, rotation, flipX, flipY);
}

/**
 * Add engineer icon to map
 * @param {number} lat - The latitude of the marker.
 * @param {number} lng - The longitude of the marker.
 * @param {number} rotation - The rotation angle in degrees.
 * @param {boolean} flipX - Whether to flip the SVG horizontally.
 * @param {boolean} flipY - Whether to flip the SVG vertically.
 * @returns {L.Marker} The added marker.
 */
function addEngineerToMap(lat, lng, rotation = 0, flipX = false, flipY = false) {
    return addGenericIconToMap(lat, lng, 'engineer', 40, rotation, flipX, flipY);
}

/**
 * Add reconnaissance icon to map
 * @param {number} lat - The latitude of the marker.
 * @param {number} lng - The longitude of the marker.
 * @param {number} rotation - The rotation angle in degrees.
 * @param {boolean} flipX - Whether to flip the SVG horizontally.
 * @param {boolean} flipY - Whether to flip the SVG vertically.
 * @returns {L.Marker} The added marker.
 */
function addReconToMap(lat, lng, rotation = 0, flipX = false, flipY = false) {
    return addGenericIconToMap(lat, lng, 'binoculars', 40, rotation, flipX, flipY);
}

/**
 * Add air icon to map
 * @param {number} lat - The latitude of the marker.
 * @param {number} lng - The longitude of the marker.
 * @param {number} rotation - The rotation angle in degrees.
 * @param {boolean} flipX - Whether to flip the SVG horizontally.
 * @param {boolean} flipY - Whether to flip the SVG vertically.
 * @returns {L.Marker} The added marker.
 */
function addAirToMap(lat, lng, rotation = 0, flipX = false, flipY = false) {
    return addGenericIconToMap(lat, lng, 'air', 40, rotation, flipX, flipY);
}

/**
 * Add Rosguard icon to map
 * @param {number} lat - The latitude of the marker.
 * @param {number} lng - The longitude of the marker.
 * @param {number} rotation - The rotation angle in degrees.
 * @param {boolean} flipX - Whether to flip the SVG horizontally.
 * @param {boolean} flipY - Whether to flip the SVG vertically.
 * @returns {L.Marker} The added marker.
 */
function addRosguardToMap(lat, lng, rotation = 0, flipX = false, flipY = false) {
    return addGenericIconToMap(lat, lng, 'rosguard', 40, rotation, flipX, flipY);
}

/**
 * Add BARS icon to map
 * @param {number} lat - The latitude of the marker.
 * @param {number} lng - The longitude of the marker.
 * @param {number} rotation - The rotation angle in degrees.
 * @param {boolean} flipX - Whether to flip the SVG horizontally.
 * @param {boolean} flipY - Whether to flip the SVG vertically.
 * @returns {L.Marker} The added marker.
 */
function addBARSToMap(lat, lng, rotation = 0, flipX = false, flipY = false) {
    return addGenericIconToMap(lat, lng, 'reserve', 40, rotation, flipX, flipY);
}

/**
 * Add volunteer icon to map
 * @param {number} lat - The latitude of the marker.
 * @param {number} lng - The longitude of the marker.
 * @param {number} rotation - The rotation angle in degrees.
 * @param {boolean} flipX - Whether to flip the SVG horizontally.
 * @param {boolean} flipY - Whether to flip the SVG vertically.
 * @returns {L.Marker} The added marker.
 */
function addVolunteerToMap(lat, lng, rotation = 0, flipX = false, flipY = false) {
    return addGenericIconToMap(lat, lng, 'volunteer', 40, rotation, flipX, flipY);
}

/**
 * Add combined arms icon to map
 * @param {number} lat - The latitude of the marker.
 * @param {number} lng - The longitude of the marker.
 * @param {number} rotation - The rotation angle in degrees.
 * @param {boolean} flipX - Whether to flip the SVG horizontally.
 * @param {boolean} flipY - Whether to flip the SVG vertically.
 * @returns {L.Marker} The added marker.
 */
function addCombinedArmsToMap(lat, lng, rotation = 0, flipX = false, flipY = false) {
    return addGenericIconToMap(lat, lng, 'combined_arms', 40, rotation, flipX, flipY);
}

/**
 * Add motorized rifle icon to map
 * @param {number} lat - The latitude of the marker.
 * @param {number} lng - The longitude of the marker.
 * @param {number} rotation - The rotation angle in degrees.
 * @param {boolean} flipX - Whether to flip the SVG horizontally.
 * @param {boolean} flipY - Whether to flip the SVG vertically.
 * @returns {L.Marker} The added marker.
 */
function addMotorizedRifleToMap(lat, lng, rotation = 0, flipX = false, flipY = false) {
    return addGenericIconToMap(lat, lng, 'motorized_rifle', 40, rotation, flipX, flipY);
}

/**
 * Add infantry icon to map
 * @param {number} lat - The latitude of the marker.
 * @param {number} lng - The longitude of the marker.
 * @param {number} rotation - The rotation angle in degrees.
 * @param {boolean} flipX - Whether to flip the SVG horizontally.
 * @param {boolean} flipY - Whether to flip the SVG vertically.
 * @returns {L.Marker} The added marker.
 */
function addInfantryToMap(lat, lng, rotation = 0, flipX = false, flipY = false) {
    return addGenericIconToMap(lat, lng, 'infantry', 40, rotation, flipX, flipY);
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
function addTankToMap(lat, lng, rotation = 0, flipX = true, flipY = false) {
  const tankIcon = L.divIcon({
    html: createTankSvg(60, rotation, flipX, flipY),
    className: 'tank-marker',
    iconSize: [60, 60],
    iconAnchor: [30, 30]
  });
  return L.marker([lat, lng], { icon: tankIcon }).addTo(window.map);
}

/**
 * Fetches enemy positions data from JSON file
 * @returns {Promise<Object>} Promise resolving to the enemy positions data
 */
async function fetchEnemyPositions() {
    try {
        const response = await fetch('./data/enemy_positions/enemy_positions_icons_latest.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch enemy positions:', error);
        return {};
    }
}

/**
 * Places all enemy icons on the map
 * Each entry format: [icon_type, [longitude, latitude]]
 * @param {Object} enemyData - Dictionary of {unit_name: [icon_type, [lng, lat]]}
 */
function placeAllEnemyIcons(enemyData) {
    for (const [unitName, data] of Object.entries(enemyData)) {
        const [iconType, coordinates] = data;
        const [lng, lat] = coordinates;
        
        // Use the mapped function if available, otherwise use generic
        const addFunction = iconTypeToFunction[iconType] || addGenericIconToMap;
        addFunction(lat, lng);
    }
}

/**
 * Loads enemy positions and places icons on the map
 * Call this after the map is initialized
 * @returns {Promise<Object>} Promise resolving to the enemy positions data
 */
async function loadAndDisplayEnemyIcons() {
    const enemyData = await fetchEnemyPositions();
    window.enemyPositionsIcons = enemyData;
    placeAllEnemyIcons(enemyData);
    return enemyData;
}

// Export for use in other modules
window.fetchEnemyPositions = fetchEnemyPositions;
window.placeAllEnemyIcons = placeAllEnemyIcons;
window.loadAndDisplayEnemyIcons = loadAndDisplayEnemyIcons;
