document.addEventListener('DOMContentLoaded', function() {
    if (window.map && window.deepStateMap) {
        L.geoJSON(window.deepStateMap, {
            style: function() {
                return {
                    color: '#ee6b6e',       // Blue for Ukraine
                    weight: 1,
                    fillOpacity: 0.4,
                    fillColor: '#ee6b6e'
                };
            }
        }).addTo(window.map);
    }
});