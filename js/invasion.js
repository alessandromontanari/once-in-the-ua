// Invasion handler - creates and animates both orcs and tanks
function createInvasionElements() {
    const svg = document.querySelector('svg');
    const animateButton = document.getElementById('animate-invasion');
    const resetButton = document.getElementById('reset-invasion');
    
    if (!svg || !animateButton || !resetButton) {
        console.log('Waiting for elements...');
        setTimeout(createInvasionElements, 100);
        return;
    }
    
    console.log('All elements found, creating invasion elements');
    
    // Add CSS for both orcs and tanks
    const style = document.createElement('style');
    style.textContent = `
        .orc, .tank {
            transition: transform 2s ease-in-out;
        }
    `;
    document.head.appendChild(style);
    
    // Create orcs
    orcPositions.forEach((pos, index) => {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale || 1})`;
        group.insertAdjacentHTML('beforeend', orcSketch);
        group.setAttribute('class', 'orc');
        group.setAttribute('data-index', index);
        svg.appendChild(group);
        console.log('Created orc at:', pos.x, pos.y);
    });
    
    // Create tanks
    tankPositions.forEach((pos, index) => {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale || 1})`;
        group.insertAdjacentHTML('beforeend', tankSketch);
        group.setAttribute('class', 'tank');
        group.setAttribute('data-index', index);
        svg.appendChild(group);
        console.log('Created tank at:', pos.x, pos.y);
    });
    
    // Single animation handler for both orcs and tanks
    animateButton.addEventListener('click', function() {
        const originalText = animateButton.textContent;
        animateButton.textContent = 'Animating...';
        
        // Animate orcs
        document.querySelectorAll('.orc').forEach((orc, index) => {
            const newPos = newOrcPositions[index];
            orc.style.transition = 'transform 2s ease-in-out';
            orc.style.transform = `translate(${newPos.x}px, ${newPos.y}px) scale(${newPos.scale})`;
        });
        
        // Animate tanks
        document.querySelectorAll('.tank').forEach((tank, index) => {
            const newPos = newTankPositions[index];
            tank.style.transition = 'transform 2s ease-in-out';
            tank.style.transform = `translate(${newPos.x}px, ${newPos.y}px) scale(${newPos.scale})`;
        });
        
        setTimeout(() => {
            animateButton.textContent = originalText;
        }, 2000);
    });
    
    // Single reset handler for both orcs and tanks
    resetButton.addEventListener('click', function() {
        // Reset orcs
        document.querySelectorAll('.orc').forEach((orc, index) => {
            const origPos = originalOrcPositions[index];
            orc.style.transition = 'none';
            orc.style.transform = `translate(${origPos.x}px, ${origPos.y}px) scale(${origPos.scale})`;
        });
        
        // Reset tanks
        document.querySelectorAll('.tank').forEach((tank, index) => {
            const origPos = originalTankPositions[index];
            tank.style.transition = 'none';
            tank.style.transform = `translate(${origPos.x}px, ${origPos.y}px) scale(${origPos.scale})`;
        });
    });
    
    console.log('Invasion elements created and animation set up');
}

// Start everything
document.addEventListener('DOMContentLoaded', createInvasionElements);