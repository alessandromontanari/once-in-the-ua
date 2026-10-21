// Test 1: Check if map exists
// console.log('Map exists?', !!window.map);

// // Test 2: Simple red circle marker (should definitely be visible)
// const testIcon = L.divIcon({
//   html: '<div style="width:40px;height:40px;background:red;border-radius:50%;"></div>',
//   iconSize: [40, 40],
//   iconAnchor: [20, 20]
// });

// const testMarker = L.marker([50.590127, 36.596479], { icon: testIcon }).addTo(window.map);
// testMarker.bindPopup("Test Marker - If you see this, the map works!").openPopup();

// Test 3: Your SVG
const orc = `
  <polygon points="0,25 40,25 10,0" style="fill:darkgreen;stroke:black;stroke-width:3;fill-rule:evenodd;" />
  <polygon points="50,25 90,25 80,0" style="fill:darkgreen;stroke:black;stroke-width:3;fill-rule:evenodd;" />
  <rect class="face" x="0" y="15" width="110" height="120" rx="50" ry="30" fill="green" stroke="black" stroke-width="3" />
  <circle class="eye" cx="20" cy="50" r="12" />
  <circle class="eye" cx="70" cy="50" r="12" />
  <polygon points="10,70 20,70 15,85" style="fill:white;stroke:black;stroke-width:1.2;fill-rule:evenodd;" />
  <polygon points="20,70 30,70 25,85" style="fill:white;stroke:black;stroke-width:1.2;fill-rule:evenodd;" />
  <polygon points="30,70 40,70 35,85" style="fill:white;stroke:black;stroke-width:1.2;fill-rule:evenodd;" />
  <polygon points="40,70 50,70 45,85" style="fill:white;stroke:black;stroke-width:1.2;fill-rule:evenodd;" />
  <polygon points="50,70 60,70 55,85" style="fill:white;stroke:black;stroke-width:1.2;fill-rule:evenodd;" />
  <polygon points="60,70 70,70 65,85" style="fill:white;stroke:black;stroke-width:1.2;fill-rule:evenodd;" />
  <polygon points="70,70 80,70 75,85" style="fill:white;stroke:black;stroke-width:1.2;fill-rule:evenodd;" />
`;

function createOrcSvgElement(size = 50) {
  const svgString = `
    <svg width="${size}" height="${size}" viewBox="0 0 110 120" xmlns="http://www.w3.org/2000/svg">
      ${orc}
    </svg>
  `;
//   console.log('SVG String:', svgString); // Debug output
//   const div = document.createElement('div');
//   div.innerHTML = svgString;
  return svgString;
}


function addOrcToMap(lat, lng) {
//   console.log('Adding orc at:', lat, lng); // Debug output
//   const orcIcon = L.divIcon({
//     html: createOrcSvgElement(40).outerHTML,
//     className: 'orc-marker',
//     iconSize: [40, 40],
//     iconAnchor: [20, 20]
//   });

    var svgString = createOrcSvgElement(40);

    var latLngBounds = L.latLngBounds([[60, 20], [40, 40]]);
    window.map.fitBounds(latLngBounds);

    var overlay = L.svgOverlay(svgString, latLngBounds, {
        opacity: 0.7,
        interactive: true
    }).addTo(window.map);

//   return L.marker([lat, lng], { icon: orcIcon }).addTo(window.map);
  return overlay;
}

// Add orc near Belgorod (inside Ukraine for visibility)
addOrcToMap(50.4, 36.6);