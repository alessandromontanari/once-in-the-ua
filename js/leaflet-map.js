// Initialize Leaflet map for Once in the UA
const map = L.map('map', {
    zoomSnap: 0.5
}).setView([49.251494, 32.516949], 6.0);
// centre coordinates (latitude, longitude, on Kremenchuts'ke Reservoir), and zoom level
// zoom level zero, the whole world
// zoom level one, it doubles its width and height
// at each zoom level, each tile is divided in four

// Tile layer that works with local file:// protocol
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// timer to change from zoom 5 to zoom 6
// setInterval(function(){
//     map.setZoom(5);
//     setTimeout(function(){
//         map.setZoom(6);
//     }, 2000);
// }, 4000);

// move and zoom
// flyTo(center, zoom), like setView but with a smooth animation

// L.geoJson(statesData).addTo(map);

// Export map instance if needed for other scripts
window.map = map;
