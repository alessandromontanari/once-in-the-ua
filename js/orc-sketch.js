// Orc sketch SVG - injected into the main SVG element
const orcSketchSVG = `
        <!-- orc sketch -->
        <polygon points="2200,250 2240,250 2210,200"
          style="fill:darkgreen;stroke:black;stroke-width:3;fill-rule:evenodd;" />
        <polygon points="2250,250 2290,250 2280,200"
          style="fill:darkgreen;stroke:black;stroke-width:3;fill-rule:evenodd;" />
        <rect
            class="face"
            x="2190"
            y="240"
            width="110"
            height="120"
            rx="50"
            ry="30"
            fill="green"
            stroke="black"
            stroke-width="3"
        />
        <circle
        class="eye"
        cx="2220"
        cy="280"
        r="12"
        />
        <circle
        class="eye"
        cx="2270"
        cy="280"
        r="12"
        />
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

// Insert the orc sketch into the SVG element
document.addEventListener('DOMContentLoaded', function() {
    const svg = document.querySelector('svg');
    if (svg) {
        // Insert before the closing </svg> tag
        svg.insertAdjacentHTML('beforeend', orcSketchSVG);
    }
});
