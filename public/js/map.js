const coordinate=listing.coordinate;
const title=listing.title;
document.addEventListener("DOMContentLoaded", () => {
        console.log("leaflet test:", L); // check loaded
         let coords;
        if (Array.isArray(coordinate) && coordinate.length === 2) {
        coords = coordinate;
        } else {
        coords = [28.61, 77.21];
        }
        const map = L.map('map').setView([coords[0],coords[1]], 13);
        var marker = L.marker([coords[0],coords[1]]).addTo(map);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap'
        }).addTo(map);
        var circle = L.circle([coords[0],coords[1]], {
        color: 'red',
        fillColor: 'rgba(247, 106, 134, 1)',
        fillOpacity: 0.5,
        radius: 500
        }).addTo(map);

        var popup = L.popup();
        function onMapClick(e) {
        popup
        .setLatLng([coords[0],coords[1]])
        .setContent(`${title}`)
        .openOn(map);
        }
        map.on('click', onMapClick);
});