// Single orc sketch as a reusable template
const orcSketch = `
    <polygon points="2200,250 2240,250 2210,200"
      style="fill:darkgreen;stroke:black;stroke-width:3;fill-rule:evenodd;" />
    <polygon points="2250,250 2290,250 2280,200"
      style="fill:darkgreen;stroke:black;stroke-width:3;fill-rule:evenodd;" />
    <rect class="face" x="2190" y="240" width="110" height="120" rx="50" ry="30"
      fill="green" stroke="black" stroke-width="3" />
    <circle class="eye" cx="2220" cy="280" r="12" />
    <circle class="eye" cx="2270" cy="280" r="12" />
    <polygon points="2210,320 2220,320 2215,335"
      style="fill:white;stroke:black;stroke-width:1.2;fill-rule:evenodd;" />
    <polygon points="2220,320 2230,320 2225,335"
      style="fill:white;stroke:black;stroke-width:1.2;fill-rule:evenodd;" />
    <polygon points="2230,320 2240,320 2235,335"
      style="fill:white;stroke:black;stroke-width:1.2;fill-rule:evenodd;" />
    <polygon points="2240,320 2250,320 2245,335"
      style="fill:white;stroke:black;stroke-width:1.2;fill-rule:evenodd;" />
    <polygon points="2250,320 2260,320 2255,335"
      style="fill:white;stroke:black;stroke-width:1.2;fill-rule:evenodd;" />
    <polygon points="2260,320 2270,320 2265,335"
      style="fill:white;stroke:black;stroke-width:1.2;fill-rule:evenodd;" />
    <polygon points="2270,320 2280,320 2275,335"
      style="fill:white;stroke:black;stroke-width:1.2;fill-rule:evenodd;" />
`;

// Define positions for your orc groups (x, y offsets)
const orcPositions = [
    { x: 1100, y: 90, scale: 0.4 },  // First orc
    { x: 1180, y: 95, scale: 0.4 },  // Second orc
    { x: 1260, y: 100, scale: 0.4 },  // Third orc
];

document.addEventListener('DOMContentLoaded', function() {
    const svg = document.querySelector('svg');
    if (svg) {
        orcPositions.forEach(pos => {
            // Create a group for each orc
            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            
            // Position the entire group
            group.setAttribute('transform', 
                `translate(${pos.x}, ${pos.y}) scale(${pos.scale || 1})`);
            
            // Add the orc sketch to the group
            group.insertAdjacentHTML('beforeend', orcSketch);
            
            // Optionally add a class for styling
            group.setAttribute('class', 'orc');
            
            // Add group to the main SVG
            svg.appendChild(group);
        });
    }
});