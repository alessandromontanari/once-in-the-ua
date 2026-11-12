// alternative without tooltip functionality
// document.addEventListener('DOMContentLoaded', function() {
//     if (window.map && window.ukraineOblasts) {
//         L.geoJSON(window.ukraineOblasts, {
//             style: function() {
//                 return {
//                     color: '#0057b8',       // Blue for Ukraine
//                     weight: 1,
//                     fillOpacity: 0.1,
//                     fillColor: '#0057b8'
//                 };
//             }
//         }).addTo(window.map);
//     }
// });

// alternative with tooltip functionality
document.addEventListener('DOMContentLoaded', function() {
    if (window.map && window.ukraineOblasts) {
        L.geoJSON(window.ukraineOblasts, {
            style: function() {
                return {
                    color: '#0057b8',       // Blue for Ukraine
                    weight: 1,
                    fillOpacity: 0.1,
                    fillColor: '#0057b8'
                };
            },
            onEachFeature: function(feature, layer) {
                // Add name on hover - use adm1_name for English
                const name = feature.properties.adm1_name ||
                           feature.properties.adm1_name1 ||
                           feature.properties.name;
                if (name) {
                    layer.bindTooltip(name);
                }
            }
        }).addTo(window.map);
    }
});