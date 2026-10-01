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
    { x: 300, y: 90, scale: 0.4 },  // First orc
    { x: 380, y: 95, scale: 0.4 },  // Second orc
    { x: 460, y: 100, scale: 0.4 },  // Third orc
];

const newOrcPositions = [
    { x: 200, y: 220, scale: 0.4 },  // New position for first orc
    { x: 280, y: 225, scale: 0.4 },  // New position for second orc
    { x: 360, y: 230, scale: 0.4 },  // New position for third orc
];

// Store original positions for reset functionality
const originalPositions = orcPositions.map(pos => ({...pos}));

// Wait for everything to be ready
function waitForSVGAndButtons() {
    const svg = document.querySelector('svg');
    const animateButton = document.getElementById('animate-orcs');
    const resetButton = document.getElementById('reset-orcs');
    
    if (!svg || !animateButton || !resetButton) {
        console.log('Waiting for elements...');
        setTimeout(waitForSVGAndButtons, 100);
        return;
    }
    
    console.log('All elements found, creating orcs');
    createOrcs(svg, animateButton, resetButton);
}

function createOrcs(svg, animateButton, resetButton) {
    // Add CSS for smooth transitions
    const style = document.createElement('style');
    style.textContent = `
        .orc {
            transition: transform 2s ease-in-out;
        }
    `;
    document.head.appendChild(style);
    
    orcPositions.forEach((pos, index) => {
        // Create a group for each orc
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        
        // Position the entire group using CSS transform
        group.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale || 1})`;
        
        // Add the orc sketch to the group
        group.insertAdjacentHTML('beforeend', orcSketch);
        
        // Add a data-index attribute and class for styling and selection
        group.setAttribute('class', 'orc');
        group.setAttribute('data-index', index);
        
        // Add group to the main SVG
        svg.appendChild(group);
        console.log('Created orc at:', pos.x, pos.y);
    });
    
    // Setup animation buttons
    setupAnimation(animateButton, resetButton);
}

function setupAnimation(animateButton, resetButton) {
    console.log('Setting up animation buttons');
    
    animateButton.addEventListener('click', function() {
        console.log('Animate button clicked');
        const orcs = document.querySelectorAll('.orc');
        console.log('Found orcs:', orcs.length);
        
        if (orcs.length === 0) return;
        
        orcs.forEach((orc, index) => {
            // Calculate new random position within reasonable bounds
            const newX = newOrcPositions[index].x;
            const newY = newOrcPositions[index].y;
            const newScale = newOrcPositions[index].scale;
            
            // Apply smooth transition
            orc.style.transition = 'transform 2s ease-in-out';
            orc.style.transform = `translate(${newX}px, ${newY}px) scale(${newScale})`;
            
            // Update stored positions
            orcPositions[index] = { x: newX, y: newY, scale: newScale };
            console.log('Moving orc to:', newX, newY, newScale);
        });
        
        // Change button text temporarily
        const originalText = animateButton.textContent;
        animateButton.textContent = 'Animating...';
        setTimeout(() => {
            animateButton.textContent = originalText;
        }, 2000);
    });
    
    resetButton.addEventListener('click', function() {
        console.log('Reset button clicked');
        const orcs = document.querySelectorAll('.orc');
        
        orcs.forEach((orc, index) => {
            // Reset to original position
            const origPos = originalPositions[index];
            orc.style.transition = 'none';
            orc.style.transform = `translate(${origPos.x}px, ${origPos.y}px) scale(${origPos.scale || 1})`;
            
            // Reset stored positions
            orcPositions[index] = {...origPos};
            console.log('Reset orc to:', origPos.x, origPos.y);
        });
    });
}

// Start the process
document.addEventListener('DOMContentLoaded', waitForSVGAndButtons);