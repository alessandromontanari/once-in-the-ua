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

// Define positions for orc group (x, y offsets)
const orcPositions = [
    { x: 480, y: 110, scale: 0.3 },  // First orc
    { x: 540, y: 115, scale: 0.3 },  // Second orc
    { x: 600, y: 120, scale: 0.3 },  // Third orc
];

const newOrcPositions = [
    { x: 200, y: 220, scale: 0.3 },  // New position for first orc
    { x: 280, y: 225, scale: 0.3 },  // New position for second orc
    { x: 360, y: 230, scale: 0.3 },  // New position for third orc
];

// Store original positions for reset functionality
const originalOrcPositions = orcPositions.map(pos => ({...pos}));