// Load citation database
let citationsDB = [];

async function loadCitations() {
  try {
    const response = await fetch('data/citations.json');
    citationsDB = await response.json();
    injectCitations();
    renderAllAutoCitations();
    generateReferences();
  } catch (error) {
    console.error('Failed to load citations:', error);
  }
}

/**
 * Returns formatted citation HTML for a given citation ID or index
 * @param {string|number} citationIdOrIndex - The citation ID or numeric index (1-based)
 * @returns {string} HTML string with the formatted citation and marker
 */
function getCitationHTML(citationIdOrIndex) {
  const isIndex = typeof citationIdOrIndex === 'number';
  const citation = isIndex
    ? citationsDB.citations[citationIdOrIndex - 1]
    : citationsDB.citations.find(c => c.id === citationIdOrIndex);
  
  if (!citation) return `[Citation not found: ${citationIdOrIndex}]`;
  
  const index = isIndex
    ? citationIdOrIndex
    : citationsDB.citations.findIndex(c => c.id === citationIdOrIndex) + 1;
  
  return `
    "${citation.text}" - ${citation.author}, <br>
    ${citation.context} <sup class="citation" data-citation-id="${citation.id}" title="${citation.text} - ${citation.author}">${index}</sup>.
  `;
}

/**
 * Renders a citation into a container element by citation ID or index
 * @param {string|number} citationIdOrIndex - The citation ID or numeric index
 * @param {HTMLElement} container - The DOM element to insert into
 */
function renderCitation(citationIdOrIndex, container) {
  if (!container) return;
  container.innerHTML = getCitationHTML(citationIdOrIndex);
  generateReferences();
}

/**
 * Auto-renders all elements with data-citation attribute
 */
function renderAllAutoCitations() {
  const autoCitations = document.querySelectorAll('[data-citation]');
  autoCitations.forEach(el => {
    const citationId = el.getAttribute('data-citation');
    el.innerHTML = getCitationHTML(citationId);
  });
}

// Replace [1], [2] markers with proper citations
function injectCitations() {
  const content = document.querySelector('.description');
  if (!content) return;

  // Find all citation markers like [1]
  const markerRegex = /\[(\d+)\]/g;
  const text = content.innerHTML;

  // Replace each marker
  const newHTML = text.replace(markerRegex, (match, index) => {
    const citation = citationsDB.citations[index - 1];
    if (!citation) return match;

    // Create citation element
    return `<sup class="citation" data-citation-id="${citation.id}" title="${citation.text} - ${citation.author}">${index}</sup>`;
  });

  content.innerHTML = newHTML;
}

// Generate references list in footer
function generateReferences() {
  const referencesContainer = document.getElementById('references');
  if (!referencesContainer) return;

  const footerUl = referencesContainer.querySelector('ul');
  if (!footerUl) return;

  // Clear existing references
  footerUl.innerHTML = '';

  // Get unique references from citations
  const references = [];
  const seenRefs = new Set();

  citationsDB.citations.forEach((citation, index) => {
    const refId = citation.reference.id;
    if (!seenRefs.has(refId)) {
      seenRefs.add(refId);
      references.push({
        id: refId,
        index: index + 1,
        ...citation.reference
      });
    }
  });

  // Add references to footer
  references.forEach(ref => {
    const li = document.createElement('li');
    li.innerHTML = `[${ref.index}] ${ref.author}, <em>${ref.title}</em>, ${ref.year}, p. ${ref.page}.`;
    footerUl.appendChild(li);
  });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', loadCitations);